import React from 'react'
import {Editor} from "@tinymce/tinymce-react";
import {Controller} from 'react-hook-form'

export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller 
            name = {name || "content"}
            control = {control}
            render = {({field: {onChange}}) => (
                <Editor
                    apiKey='h5f3v2r0hcxkduljwhzp04mlmcwffgdvbqh40v5r5ydjmlow'
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat', tinycomments_mode: 'embedded', tinycomments_author: 'Author name', content_style: "body {font-family: helvetica, Arial, sans-serif; font-size: 14px}",
                        ai_request: (request, respondWith) => {
                            // This is a mock response; for real use, call your own AI API or OpenAI
                            respondWith.success({
                                message: 'AI response not implemented in this demo.'
                            });
                        }

                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}


