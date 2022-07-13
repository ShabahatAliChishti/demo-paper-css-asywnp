import { Component, AfterViewInit } from "@angular/core";
import { NgxPrinterService } from "ngx-printer";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  name = "Angular";
  hidePage = false;

  constructor(private printerService: NgxPrinterService) {}

  ngAfterViewInit() {
    this.printerService.$printWindowOpen.subscribe(opened => {
      this.hidePage = opened;
      console.log(this.hidePage);
    });
  }

  print() {
    const css = `
      @page {
        margin: 0;
        size: 14.8cm 10.5cm;
      }
    `;

    const head = document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.type = "text/css";
    style.media = "print";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);

    this.printerService.printDiv("printDiv");
  }
}
