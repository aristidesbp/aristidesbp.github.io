import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import JSZip from 'jszip';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  idbGetAllProducts,
  idbGetAllEntities,
  idbGetAllSales,
  idbGetAllFinances,
  idbGetAllInstallments,
} from './offlineDb';

// Initialize Firebase App if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export interface GoogleDriveUploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  webViewLink?: string;
  message: string;
}

/**
 * Authenticates user with Google (requesting Drive scope) and uploads a zip package of the project & database.
 */
export async function uploadProjectToGoogleDrive(): Promise<GoogleDriveUploadResult> {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/drive.file');

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error('Não foi possível obter o token de acesso do Google.');
    }

    const accessToken = credential.accessToken;

    // Collect all database records from IndexedDB
    const prods = await idbGetAllProducts();
    const ents = await idbGetAllEntities();
    const sales = await idbGetAllSales();
    const fins = await idbGetAllFinances();
    const insts = await idbGetAllInstallments();

    const storedConfigRaw = localStorage.getItem('erp_abp_store_config');
    const storeConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : {};

    const backupPayload = {
      exportedAt: new Date().toISOString(),
      version: '3.0 - Multi-Tenant SaaS ERP ABP',
      storeConfig,
      products: prods,
      entities: ents,
      sales: sales,
      finances: fins,
      installments: insts,
    };

    // Build ZIP package using JSZip
    const zip = new JSZip();
    zip.file('backup_dados_erp.json', JSON.stringify(backupPayload, null, 2));

    const dateStr = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const fileName = `Supermercado_ABP_Projeto_Backup_${dateStr}.zip`;

    // Add README info inside the zip
    zip.file(
      'README_RESTAURACAO.txt',
      `=============================================================
SUPERMERCADO ABP - REPOSITÓRIO E BACKUP INTEGRAL DO PROJETO
=============================================================
Data do Backup: ${new Date().toLocaleString('pt-BR')}
Projeto: Supermercado ABP (SaaS Multi-Loja)
Usuário Google: ${result.user.email}

CONTEÚDO DO PACOTE:
1. backup_dados_erp.json: Dados de Produtos, Vendas, Clientes, Financeiro e Turno de Caixa.
2. Este arquivo foi salvo diretamente na sua conta do Google Drive via Google Drive API.

Para restaurar no sistema:
Acesse a aba 'Configurações' -> 'Importar Backup (JSON)' no Supermercado ABP.
`
    );

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Upload to Google Drive via REST API Multipart
    const metadata = {
      name: fileName,
      mimeType: 'application/zip',
      description: 'Backup completo do projeto Supermercado ABP ERP com dados e banco local',
    };

    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    formData.append('file', zipBlob, fileName);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google Drive Upload Error:', errText);
      throw new Error(`Erro na API do Google Drive: ${response.statusText}`);
    }

    const driveFile = await response.json();

    return {
      success: true,
      fileId: driveFile.id,
      fileName: driveFile.name,
      webViewLink: driveFile.webViewLink,
      message: `Projeto e dados salvos no Google Drive com sucesso como "${driveFile.name}"!`,
    };
  } catch (error: any) {
    console.error('Falha ao salvar no Google Drive:', error);
    return {
      success: false,
      message: error.message || 'Falha ao conectar ou enviar arquivo ao Google Drive.',
    };
  }
}
