import React from "react";
import App, { Container } from "next/app";
import { Provider } from "mobx-react";
import TodoStore from "../stores/TodoStore";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider TodoStore={TodoStore}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default MyApp;
