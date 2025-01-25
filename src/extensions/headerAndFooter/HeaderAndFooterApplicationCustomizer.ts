import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderAndFooterApplicationCustomizerStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';

const LOG_SOURCE: string = 'HeaderAndFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderAndFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderAndFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderAndFooterApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent ;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style%20Library/css/customstyle.css?csf=1&e=BWVfhf");

    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/css/bootstrap.css");
    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/css/style.css");
    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/plugins/revolution/css/settings.css");
    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/plugins/revolution/css/layers.css");
    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/plugins/revolution/css/navigation.css");
    SPComponentLoader.loadCss(this.context.pageContext.web.absoluteUrl + "/Style Library/css/responsive.css");

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    //this._loadHeaderHtmlContent();
    return Promise.resolve();
  }

  private _loadHeaderHtmlContent(): void {
    const htmlUrl = this.context.pageContext.web.absoluteUrl + '/Style Library/header.html';

    fetch(htmlUrl)
      .then(response => response.text())
      .then(html => {
        const headerElement = document.querySelector('.ms-compositeHeader');
        if (headerElement) {
          headerElement.innerHTML = html;
        } else {
          const div = document.createElement('div');
          div.innerHTML = html;
          document.body.insertBefore(div, document.body.firstChild);
        }
      })
      .catch(error => console.error('Error loading HTML:', error));
  }


private _renderPlaceHolders(): void {
  console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
  console.log(
    "Available placeholders: ",
    this.context.placeholderProvider.placeholderNames
      .map(name => PlaceholderName[name])
      .join(", ")
  );

  // Handling the top placeholder
  if (!this._topPlaceholder) {
    this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose }
    );

    // The extension should not assume that the expected placeholder is available.
    if (!this._topPlaceholder) {
      console.error("The expected placeholder (Top) was not found.");
      return;
    }

    if (this.properties) {
      let topString: string = this.properties.Top;
      if (!topString) {
        topString = "(Top property was not defined.)";
      }

      if (this._topPlaceholder.domElement) {


        const htmlUrl = this.context.pageContext.web.absoluteUrl + '/Style Library/header.html';

        fetch(htmlUrl)
          .then(response => response.text())
          .then(html => {
            this._topPlaceholder.domElement.innerHTML = html;
          })
          .catch(error => console.error('Error loading HTML:', error));


      }
    }
  }

  // Handling the bottom placeholder
  if (!this._bottomPlaceholder) {
    this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom,
      { onDispose: this._onDispose }
    );

    // The extension should not assume that the expected placeholder is available.
    if (!this._bottomPlaceholder) {
      console.error("The expected placeholder (Bottom) was not found.");
      return;
    }

    if (this.properties) {
      let bottomString: string = this.properties.Bottom;
      if (!bottomString) {
        bottomString = "(Bottom property was not defined.)";
      }

      if (this._bottomPlaceholder.domElement) {





        const htmlUrl = this.context.pageContext.web.absoluteUrl + '/Style Library/footer.html';

        fetch(htmlUrl)
          .then(response => response.text())
          .then(html => {
            this._bottomPlaceholder.domElement.innerHTML = html;
          })
          .catch(error => console.error('Error loading HTML:', error));






      }
    }
  }
}


private _onDispose(): void {
  console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
}



}
