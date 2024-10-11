// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

function CustomEditor() {
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                // licenseKey: '<YOUR_LICENSE_KEY>',
                initialData: '<p>CKEditor 5</p>'
            } }
        />
    );
}

export default CustomEditor;
