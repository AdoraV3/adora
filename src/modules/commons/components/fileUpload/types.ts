export interface FileUploadResponse {
  url: string;
  name: string;
  key: string;
  status: string;
  bytes: number;
  purpose: string;
  path: string;
  id: string;
  orgId: string;
  bucket: string;
  createdAt: string;
  updatedAt: string;
  originalName: string;
}
