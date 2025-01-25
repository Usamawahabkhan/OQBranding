import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider

} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './OqMainBannerNewsWebPart.module.scss';
import * as strings from 'OqMainBannerNewsWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IOqMainBannerNewsWebPartProps {
  description: string;
  listName: string;
  slideInterval: number;
  newsList: string;
  eventList:string;
}

interface ISlideItem {
  Id: number;
  Title: string;
  ImageURL: { Url: string };
  Caption: string;
}
export interface INewsItem {
  Id: number;
  Title: string;
  ImageURL: string;
  Caption: string;
}

export interface IEventItem {
  Id: number;
  Title: string;
  EventDate: Date;
  ImageURL: string;
  EventLink: string;
}



export default class OqMainBannerNewsWebPart  extends BaseClientSideWebPart<IOqMainBannerNewsWebPartProps> {
  private slides: ISlideItem[] = [];
  private newsItems: INewsItem[] = [];
  private eventItems: IEventItem[] = [];
  private currentSlideIndex: number = 0;
  private slideInterval: number = 2000;
  private intervalId: number = 0;

  protected async onInit(): Promise<void> {
    await super.onInit();
    return this.loadSlides();
  }

  private async loadSlides(): Promise<void> {
    if (!this.properties.listName) {
      this.domElement.innerHTML = `Please configure the list name in the web part properties.`;
      return;
    }

    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items?$select=Id,Title,ImageURL,Caption`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.slides = data.value;
      this.render();
    } catch (error) {
      console.error('Error loading slides:', error);
      this.domElement.innerHTML = `Error loading slides. Please check the list name and try again.`;
    }
  }


  private _loadCustomScripts(): void {
    const scripts = [
      "/Style%20Library/js/jquery.js",
      //"/Style%20Library/js/bootstrap.min.js",
      "/Style%20Library/js/jquery.fancybox.js",
      "/Style%20Library/js/jquery-ui.js",
      "/Style%20Library/js/owl.js",
      // "/Style%20Library/js/mixitup.js",
      // "/Style%20Library/js/wow.js",
      // "/Style%20Library/js/appear.js",
      "/Style%20Library/js/eventscript.js"
    ];

    scripts.forEach(script => {
      SPComponentLoader.loadScript(this.context.pageContext.web.absoluteUrl + script);
    });
  }

  public render(): void {
    if (this.slides.length === 0) return;


    this.domElement.innerHTML = `
      <div class="${styles.imageSlideshow}">
        <div class="${styles.slideshowContainer}">
          ${this.slides.map((slide, index) => `
            <div class="${styles.slide} ${index === this.currentSlideIndex ? styles.active : ''}">
              <div class="${styles.numbertext}">${index + 1} / ${this.slides.length}</div>
              <img src="${slide.ImageURL.Url}" alt="${slide.Title}" style="width:100%">
              <div class="${styles.caption}">${slide.Caption}</div>
            </div>
          `).join('')}

          <button class="${styles.prev}" aria-label="Previous slide">❮</button>
          <button class="${styles.next}" aria-label="Next slide">❯</button>
        </div>



      </div>

      <section class="news-section eventsblocks">
      <div class="auto-container">
        <div class="sec-title">
          <h2>Up Coming Events</h2>
          <div class="separator"></div>
        </div>
        <div id="news-carousel" class="three-item-carousel owl-carousel owl-theme">
        </div>
      </div>
    </section>
    `;

    //this.setEventListeners();
    this.startSlideshow();


    this.renderEventNews();

  }

  private async renderEventNews(){



    await this._loadEventItems();




  }

  private async _loadEventItems(): Promise<void> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.eventList}')/items?$select=Id,Title,EventDate,EventLink`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
      }




      const data = await response.json();

      this.eventItems = data.value.map((item: any) => ({
        Id: item.Id,
        Title: item.Title,
        EventDate: new Date(item.EventDate),
       // ImageURL: item.ImageURL,
       // EventLink: item.EventLink
      }));

      this._renderEventItems();

    } catch (error) {
      console.error('Error loading news items:', error);
      this.domElement.innerHTML = `Error loading news items. Please check the list name and try again.`;
    }

  }

  private _renderEventItems(): void {

    const newsCarousel = this.domElement.querySelector("#news-carousel");
    let html = '';

    this.eventItems.forEach(item => {
      const day = item.EventDate.getDate();
      const month = item.EventDate.toLocaleString('default', { month: 'short' });

      html += `
        <div class="news-block">
          <div class="inner-box">
            <div class="eventdte">
              <h3>${day}</h3>
              <h5>${month}</h5>
            </div>
            <div class="eventdtls">
              <h2><a href="${item.EventLink}">${item.Title}</a></h2>
              <div class="post-date"><span><img src="/Style%20Library/images/icons/calendar.svg" /> ${item.EventDate.toDateString()}</span></div>
            </div>
          </div>
        </div>`;
    });

    if (newsCarousel) {
      newsCarousel.innerHTML = html;
    }




  }


  private setEventListeners(): void {
    const prevButton = this.domElement.querySelector("${styles.prev}");
    const nextButton = this.domElement.querySelector('${styles.next}');

    prevButton.addEventListener('click', () => this.moveSlide(-1));
    nextButton.addEventListener('click', () => this.moveSlide(1));


}


  private moveSlide(direction: number): void {
    let newIndex = this.currentSlideIndex + direction;
    if (newIndex >= this.slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = this.slides.length - 1;
    this.showSlide(newIndex);
  }

  private showSlide(index: number): void {
    const slides = this.domElement.querySelectorAll(`.${styles.slide}`);
    const dots = this.domElement.querySelectorAll(`.${styles.dot}`);
// Handling slides
Array.prototype.slice.call(slides).forEach((slide) => {
  (slide as HTMLElement).classList.remove(styles.active);
});

// Handling dots
Array.prototype.slice.call(dots).forEach((dot) => {
  dot.addEventListener('click', (e) => {
    const index = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0');
    this.showSlide(index);
  });

});


    (slides[index] as HTMLElement).classList.add(styles.active);
    this.currentSlideIndex = index;
  }

  private startSlideshow(): void {
    this.stopSlideshow();
    this.intervalId = window.setInterval(() => {
      this.moveSlide(1);
    }, this.properties.slideInterval * 1000 || 2000);
  }

  private stopSlideshow(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }

  protected onDispose(): void {
    this.stopSlideshow();
  }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Slideshow Settings"
          },
          groups: [
            {
              groupName: "Basic Settings",
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: "Slider List Name"
                }),
                PropertyPaneTextField('newsList', {
                  label: "News List Name"
                }),
                PropertyPaneTextField('eventList', {
                  label: "event List Name"
                }),
                PropertyPaneSlider('slideInterval', {
                  label: "Slide Interval (seconds)",
                  min: 1,
                  max: 10,
                  value: 2,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
