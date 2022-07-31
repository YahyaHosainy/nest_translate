import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'publicRoute';
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
