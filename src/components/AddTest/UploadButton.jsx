import React from 'react'

function UploadButton(props) {
    return (
        <div class="upload">
            <input class="upload-input" id="file" type="file" onChange={(e) => props.onChange(e)}/>
            <div class="upload-list"></div>
        </div>
    )
}

export default UploadButton