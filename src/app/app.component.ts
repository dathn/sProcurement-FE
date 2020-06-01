import { Component, AfterViewChecked, ElementRef, AfterViewInit } from '@angular/core';

declare const $;
declare const jquery;
declare const jQuery;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewChecked() {
    const e = document.createElement('script');
    e.type = 'text/javascript';
    e.src = '../assets/js/app.js';
    const m = document.createElement('script');
    m.type = 'text/javascript';
    m.src = '../assets/js/form-wizard.min.js';
    const n = document.createElement('script');
    n.type = 'text/javascript';
    n.src = '../assets/plugins/counterup/jquery.counterup.js';
    const o = document.createElement('script');
    o.type = 'text/javascript';
    o.src = 'assets/plugins/counterup/jquery.waypoints.min.js';
    const p = document.createElement('script');
    p.type = 'text/javascript';
    p.src = '../assets/plugins/bootstrap-fileinput/bootstrap-fileinput.js';
    const q = document.createElement('script');
    q.type = 'text/javascript';
    q.src = '../assets/js/table-datatables-scroller.min.js';
    const r = document.createElement('script');
    r.type = 'text/javascript';
    r.src = '../assets/plugins/dropzone/dropzone.min.js';
    const t = document.createElement('script');
    t.type = 'text/javascript';
    t.src = '../assets/js/form-validation-md.min.js';
    const u = document.createElement('script');
    u.type = 'text/javascript';
    u.src = '../assets/js/components-date-time-pickers.js';
    const v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = '../assets/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js';
    const w = document.createElement('script');
    w.type = 'text/javascript';
    w.src = '../assets/js/form-repeater.min.js';
    const x = document.createElement('script');
    x.type = 'text/javascript';
    x.src = '../assets/js/layout.js';
    const y = document.createElement('script');
    y.type = 'text/javascript';
    y.src = '../assets/plugins/jquery-repeater/jquery.repeater.js';

    // this.elementRef.nativeElement.appendChild(s);
    // this.elementRef.nativeElement.appendChild(e);
    // this.elementRef.nativeElement.appendChild(m);
    // this.elementRef.nativeElement.appendChild(n);
    // this.elementRef.nativeElement.appendChild(o);
    // // this.elementRef.nativeElement.appendChild(p);
    // // this.elementRef.nativeElement.appendChild(q);
    // this.elementRef.nativeElement.appendChild(r);
    // this.elementRef.nativeElement.appendChild(t);
    // this.elementRef.nativeElement.appendChild(u);
    // this.elementRef.nativeElement.appendChild(v);
    // this.elementRef.nativeElement.appendChild(w);
    // this.elementRef.nativeElement.appendChild(x);
    // this.elementRef.nativeElement.appendChild(y);

  }

}
