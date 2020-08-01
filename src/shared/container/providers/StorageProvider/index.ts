import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import ISthorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<ISthorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
