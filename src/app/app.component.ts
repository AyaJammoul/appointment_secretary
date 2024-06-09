import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test1';
  name='aya';
   sayHello(name:string) {
      console.log('Hello World ' + name);
    }
}
