// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Replace these with your live Heroku URLs
  const NODE_API_URL = process.env.REACT_APP_NODE_API_URL;
  const PYTHON_API_URL = process.env.REACT_APP_PYTHON_API_URL;


  const [video, setVideo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [processingStatus, setProcessingStatus] = useState("");
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchUploadedVideos();
  }, []);

  // Capture file input
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Upload video to Node server
  // const handleUpload = async () => {
  //   if (!video) {
  //     setUploadStatus("Please select a video file.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("video", video);
  //   try {
  //     await axios.post(`${NODE_API_URL}/upload`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     setUploadStatus("Upload successful!");
  //     fetchUploadedVideos();
  //   } catch (error) {
  //     console.error(error);
  //     setUploadStatus("Upload failed!");
  //   }
  // };

  const handleUpload = async () => {
    if (!video) {
        setUploadStatus("Please select a video file.");
        return;
    }

    const formData = new FormData();
    formData.append("video", video);

    console.log("Uploading to:", `${NODE_API_URL}/upload`);

    try {
        const response = await axios.post(`${NODE_API_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Upload success response:", response.data);
        setUploadStatus("Upload successful!");
        fetchUploadedVideos();
    } catch (error) {
        console.error("Upload error:", error.response ? error.response.data : error.message);
        setUploadStatus(`Upload failed: ${error.response ? error.response.data.error : error.message}`);
    }
};


  // Fetch the list of uploaded videos from Node
  const fetchUploadedVideos = async () => {
    try {
      const response = await axios.get(`${NODE_API_URL}/videos`);
      setUploadedVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // //Send the filename to the Python server for processing
  // const handleProcessVideo = async (filename) => {
  //   setProcessingStatus("Processing...");
  //   try {
  //     const formData = new FormData();
  //     formData.append("filename", filename); 

  //     const response = await axios.post(`${PYTHON_API_URL}/process_video`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     setProcessingStatus("Processing complete!");
  //     // Save both the analysis and processed video URL in one object
  //     setAnalysis({
  //       ...response.data.analysis,
  //       processed_video: response.data.processed_video,
  //     });
  //   } catch (error) {
  //     console.error("Error processing video:", error);
  //     setProcessingStatus("Processing failed!");
  //   }
  // };

  const handleProcessVideo = async (filename) => {
    setProcessingStatus("Processing...");
    try {
        const formData = new FormData();
        formData.append("filename", filename); 

        console.log("Sending request to:", `${PYTHON_API_URL}/process_video`);

        const response = await axios.post(`${PYTHON_API_URL}/process_video`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Process success response:", response.data);
        setProcessingStatus("Processing complete!");
        setAnalysis({
            ...response.data.analysis,
            processed_video: response.data.processed_video,
        });
    } catch (error) {
        console.error("Processing error:", error.response ? error.response.data : error.message);
        setProcessingStatus(`Processing failed: ${error.response ? error.response.data.error : error.message}`);
    }
};


//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Squat Form Guru</h1>
//       <p>Upload your squatting video to get started:</p>

//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
//         Upload Video
//       </button>
//       <p>{uploadStatus}</p>

//       <h2>Uploaded Videos</h2>
//       <div>
//         {uploadedVideos.length === 0 ? (
//           <p>No videos uploaded yet.</p>
//         ) : (
//           uploadedVideos.map((vid, index) => (
//             <div key={index} style={{ marginBottom: "10px" }}>
//               <video width="320" height="240" controls>
//                 <source src={vid.url} type="video/mp4" />
//               </video>
//               <p>{vid.filename}</p>
//               <button
//                 onClick={() => handleProcessVideo(vid.filename)}
//                 style={{
//                   background: "blue",
//                   color: "white",
//                   padding: "5px 10px",
//                   cursor: "pointer",
//                   marginLeft: "10px",
//                 }}
//               >
//                 Process Video
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       <h2>Processing Status</h2>
//       <p>{processingStatus}</p>

//       {analysis && (
//         <div>
//           <h2>Exercise Analysis</h2>
//           <p>Reps: {analysis.reps}</p>
//           <p>Squat Depth: {analysis.squat_depth}</p>
//           <p>Pace: {analysis.pace}</p>
//           <p>Average Knee Angle: {Math.round(analysis.average_knee_angle)}°</p>

//           {/* Download link styled as a button */}
//           <a
//             href={analysis.processed_video}
//             download
//             style={{
//               display: "inline-block",
//               padding: "10px 20px",
//               backgroundColor: "#007BFF",
//               color: "#fff",
//               textDecoration: "none",
//               borderRadius: "4px",
//               marginTop: "10px"
//             }}
//           >
//             Download Processed Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Squat Form Guru</h1>
      <p style={{ textAlign: "center" }}>Upload your squatting video to get started:</p>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button 
          onClick={handleUpload} 
          style={{
            backgroundColor: "#007BFF", 
            color: "white", 
            padding: "8px 15px", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
        >
          Upload Video
        </button>
      </div>
      <p style={{ textAlign: "center", color: uploadStatus.includes("failed") ? "red" : "green" }}>{uploadStatus}</p>

      <h2>Uploaded Videos</h2>
      <div>
        {uploadedVideos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          uploadedVideos.map((vid, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15px" }}>
              <video width="320" height="240" controls>
                <source src={vid.url} type="video/mp4" />
              </video>
              <p>{vid.filename}</p>
              <button
                onClick={() => handleProcessVideo(vid.filename)}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "5px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "darkblue"}
                onMouseOut={(e) => e.target.style.backgroundColor = "blue"}
              >
                Process Video
              </button>
            </div>
          ))
        )}
      </div>

      <h2>Processing Status</h2>
      <p style={{ textAlign: "center", color: processingStatus.includes("failed") ? "red" : "black" }}>{processingStatus}</p>

      {analysis && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Exercise Analysis</h2>
          <p><strong>Reps:</strong> {analysis.reps}</p>
          <p><strong>Squat Depth:</strong> {analysis.squat_depth}</p>
          <p><strong>Pace:</strong> {analysis.pace}</p>
          <p><strong>Average Knee Angle:</strong> {Math.round(analysis.average_knee_angle)}°</p>        
        </div>
      )}
    </div>
  );
}

export default App;



