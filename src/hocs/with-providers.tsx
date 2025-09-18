import { type ComponentType } from "react";
import StoresProvider from "../providers/stores-provider/stores-provider";

export interface WithProvidersConfig<TProps extends object> {
  Fallback?: ComponentType<TProps>;
}

export const withProviders = <TProps extends object>(
  Component: ComponentType<TProps>,
  { Fallback = () => null }: WithProvidersConfig<TProps> = {},
): ComponentType<TProps> => {
  const WithProviders = (props: TProps) => {
    return (
      <StoresProvider fallback={<Fallback {...props} />}>
        <Component {...props} />
      </StoresProvider>
    );
  };
  WithProviders.displayName = `WithProviders(${Component.displayName || Component.name})`;

  return WithProviders;
};
