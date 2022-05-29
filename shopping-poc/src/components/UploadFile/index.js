import React, { useRef } from "react";
import Dropzone from "react-dropzone";

function UploadFile({ onDrop, accept, uploading, file }) {
  const inputRef = useRef(null);

  return (
    <>
      <Dropzone
        accept={accept}
        onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            id="upload-container-inner"
            className={"upload_container"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="82"
              height="85"
              viewBox="0 0 82 85"
              fill="none"
            >
              <script xmlns="" />
              <path
                d="M8.54281 42.4994C6.83447 37.1869 6.83447 31.8744 6.83447 28.1781C6.83447 15.8596 17.4756 3.54102 30.602 3.54102C39.3994 3.54102 47.0804 8.49553 51.19 15.8596H54.3696C64.2145 15.8596 73.4595 23.0202 73.4595 31.8744C73.4595 35.416 73.4595 38.9577 71.7511 42.4994"
                stroke="#778296"
                stroke-width="7.08333"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="cloud"
              />
              <path
                d="M53.2427 51.9492L39.2913 38.0719L25.3399 51.9492"
                stroke="#778296"
                stroke-width="7.08333"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="arrow"
              />
              <path
                d="M39.2905 41.7246V80.6829"
                stroke="#778296"
                stroke-width="7.08333"
                stroke-linecap="round"
                id="line"
              />
            </svg>
            {uploading ? (
              <div className="upload-area-text">Please wait...</div>
            ) : (
              <>
                {file ? (
                  <p className="file_name">{file}</p>
                ) : (
                  <div className="upload-area-text">
                    <i className="icon-md picture"></i>
                    <p>
                      Drop your image here, or{" "}
                      <span className="upload-area-text-inner">browse</span>
                    </p>
                  </div>
                )}
              </>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              accept={accept}
              ref={inputRef}
              onChange={(e) => {
                onDrop(e.target.files);
              }}
              onClick={(e) => {
                e.target.value = null;
              }}
              {...getInputProps()}
            />
          </div>
        )}
      </Dropzone>
    </>
  );
}

export default UploadFile;
