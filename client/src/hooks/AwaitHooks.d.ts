import React from 'react';
type AwaitHooksPropsType = {
    data: Promise<any>;
    loadingComponent: React.ReactNode;
    children: (data: any) => React.ReactNode;
};
declare const AwaitHooks: ({ children, data, loadingComponent }: AwaitHooksPropsType) => import("react/jsx-runtime").JSX.Element;
export default AwaitHooks;
