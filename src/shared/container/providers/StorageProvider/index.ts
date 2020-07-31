import { container } from 'tsyringe';
import ISthorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<ISthorageProvider>(
  'StorageProvider',
  providers.disk,
);
