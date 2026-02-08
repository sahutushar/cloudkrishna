const { BlobServiceClient } = require('@azure/storage-blob');

class AzureStorageService {
  constructor() {
    this.connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    this.containerName = process.env.AZURE_CONTAINER_NAME || 'resumes';
    
    if (!this.connectionString) {
      console.warn('⚠️  Azure Storage connection string not found. File upload will use local storage.');
      this.blobServiceClient = null;
      return;
    }

    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
      console.log('✅ Azure Blob Storage connected successfully');
    } catch (error) {
      console.error('❌ Azure Blob Storage connection failed:', error.message);
      this.blobServiceClient = null;
    }
  }

  async uploadFile(file, fileName) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Blob Storage not configured');
    }

    try {
      // Get container client
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      // Create container if it doesn't exist
      await containerClient.createIfNotExists({
        access: 'blob' // Public read access for resumes
      });

      // Generate unique filename
      const uniqueFileName = `${Date.now()}-${fileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);

      // Upload file
      const uploadResponse = await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      console.log(`✅ File uploaded successfully: ${uniqueFileName}`);
      
      return {
        fileName: uniqueFileName,
        url: blockBlobClient.url,
        uploadResponse
      };
    } catch (error) {
      console.error('❌ File upload failed:', error.message);
      throw error;
    }
  }

  async deleteFile(fileName) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Blob Storage not configured');
    }

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      
      await blockBlobClient.deleteIfExists();
      console.log(`✅ File deleted successfully: ${fileName}`);
    } catch (error) {
      console.error('❌ File deletion failed:', error.message);
      throw error;
    }
  }

  async getFileUrl(fileName) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Blob Storage not configured');
    }

    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    
    return blockBlobClient.url;
  }

  isConfigured() {
    return this.blobServiceClient !== null;
  }
}

module.exports = new AzureStorageService();