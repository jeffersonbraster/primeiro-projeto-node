import { container } from 'tsyringe';
import IStorareProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorareProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
