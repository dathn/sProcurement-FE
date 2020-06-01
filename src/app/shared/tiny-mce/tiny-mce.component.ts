import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simple-tiny',
  templateUrl: './tiny-mce.component.html',
  styleUrls: ['./tiny-mce.component.css']
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @Input() content: string;
  editor;

  ngAfterViewInit() {
    tinymce.baseURL = '/assets/tinymce';
    tinymce.init({
      height: '480',
      selector: '#' + this.elementId,
      plugins: 'autosave autolink code codesample colorpicker emoticons fullscreen hr image imagetools media preview table textcolor wordcount',
      toolbar: 'imageupload forecolor cut copy paste fontselect styleselect bold italic bold link preview code image',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('init', () => {
          tinymce.activeEditor.setContent(this.content);
        });
      },

    });

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
