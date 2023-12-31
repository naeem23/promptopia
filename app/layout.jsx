import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Dicover the best prompts from around the web.',
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
