// import React, { useEffect, useRef, useState } from "react";
// import { pdfjs, Document, Page } from "react-pdf";

// // Use Unpkg for the worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function AnalysisPDFViewer({ url, highlights = [], pageWidth = 800 }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageRects, setPageRects] = useState({});
  
//   // Debug: Log active highlights
//   useEffect(() => {
//     if(highlights.length > 0) console.log("Searching PDF for:", highlights.map(h => h.text));
//   }, [highlights]);

//   const onDocLoadSuccess = ({ numPages }) => setNumPages(numPages);

//   // Aggressive cleaner: "Scope of Work" -> "scopeofwork"
//   const cleanText = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

//   const buildPageHighlights = async (pageIndex) => {
//     if (!url || !highlights?.length) return;

//     try {
//       const pdf = await pdfjs.getDocument(url).promise;
//       const page = await pdf.getPage(pageIndex + 1);
//       const viewport = page.getViewport({ scale: 1 });
//       const textContent = await page.getTextContent();
      
//       const items = textContent.items; 
//       let fullPageClean = ""; 
//       const charMap = []; 

//       // 1. Build Clean Text Map
//       items.forEach((item, itemIdx) => {
//         const str = item.str;
//         // Skip empty items to keep indices tighter
//         if (!str.trim()) return;

//         for (let charIdx = 0; charIdx < str.length; charIdx++) {
//           const char = str[charIdx];
//           if (/[a-zA-Z0-9]/.test(char)) {
//             fullPageClean += char.toLowerCase();
//             charMap.push({ itemIdx, item });
//           }
//         }
//       });

//       const foundRects = [];

//       // 2. Search
//       for (const h of highlights) {
//         if (!h.text) continue;
//         const needle = cleanText(h.text);
//         if (needle.length < 3) continue;

//         let startSearch = 0;
//         while (true) {
//           const matchIndex = fullPageClean.indexOf(needle, startSearch);
//           if (matchIndex === -1) break;

//           const endMatchIndex = matchIndex + needle.length;
          
//           // SAFETY CHECK: Ensure the match doesn't span the whole page
//           // We check the itemIndex of the first char vs the last char.
//           // If they are too far apart (e.g. > 10 items), it's likely a false match (Header + Footer).
//           const firstItemIdx = charMap[matchIndex].itemIdx;
//           const lastItemIdx = charMap[endMatchIndex - 1].itemIdx;
          
//           if (Math.abs(lastItemIdx - firstItemIdx) < 20) {
//              const involvedItems = new Set();
//              for (let k = matchIndex; k < endMatchIndex; k++) {
//                 if (charMap[k]) involvedItems.add(charMap[k].item);
//              }

//              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
             
//              involvedItems.forEach((item) => {
//                // PDF Coordinates
//                const tx = item.transform[4]; // x
//                const ty = item.transform[5]; // y (baseline)
//                // Height: Use transform scale (index 3) or fallback
//                const h = item.height || Math.abs(item.transform[3]); 
//                // Width: precise or estimated
//                const w = item.width || (item.str.length * h * 0.5);

//                if (tx < minX) minX = tx;
//                // PDF Y increases upwards. Bottom is ty - descent (approx ty). Top is ty + h.
//                if (ty < minY) minY = ty; 
//                if (tx + w > maxX) maxX = tx + w;
//                if (ty + h > maxY) maxY = ty + h;
//              });

//              if (minX !== Infinity) {
//                 const scale = pageWidth / viewport.width;
//                 // Convert PDF (Bottom-Left) to DOM (Top-Left)
//                 // top = viewportHeight - (PDF_Y_Top)
//                 foundRects.push({
//                   id: h.id,
//                   left: minX * scale,
//                   top: (viewport.height - maxY) * scale, 
//                   width: (maxX - minX) * scale,
//                   height: (maxY - minY) * scale,
//                   color: h.color,
//                   text: h.text
//                 });
//              }
//           }
//           startSearch = matchIndex + 1;
//         }
//       }
//       setPageRects(prev => ({ ...prev, [pageIndex + 1]: foundRects }));
//     } catch (err) {
//       console.error("Error building highlights:", err);
//     }
//   };

//   return (
//     <div className="w-full relative bg-gray-100 min-h-[500px] flex flex-col items-center py-8">
//       <Document 
//         file={url} 
//         onLoadSuccess={onDocLoadSuccess}
//         loading={<div className="p-10 text-gray-500">Loading Document...</div>}
//       >
//         {Array.from(new Array(numPages || 0), (_, i) => (
//           <div key={`page-${i}`} className="relative mb-8 shadow-lg bg-white block">
//             <Page
//               pageNumber={i + 1}
//               width={pageWidth}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//               onRenderSuccess={() => buildPageHighlights(i)}
//             />
//             {(pageRects[i + 1] || []).map((r, ix) => (
//               <div
//                 key={`${r.id}-${ix}`}
//                 title={r.text}
//                 style={{
//                   position: "absolute",
//                   left: r.left,
//                   top: r.top,
//                   width: r.width,
//                   height: r.height,
//                   backgroundColor: r.color,
//                   mixBlendMode: "multiply", 
//                   cursor: "pointer",
//                   zIndex: 10,
//                   border: "1px solid rgba(0,0,0,0.2)"
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </Document>
//     </div>
//   );
// }

// // src/pages/AnalysisPDF.js
// import React, { useEffect, useRef, useState } from "react";
// import { pdfjs, Document, Page } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function AnalysisPDFViewer({ url, highlights = [], pageWidth = 800 }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageRects, setPageRects] = useState({});
  
//   useEffect(() => {
//     if(highlights.length > 0) {
//       console.log("Highlights to search:", highlights.map(h => ({
//         text: h.text,
//         cleaned: cleanText(h.text)
//       })));
//     }
//   }, [highlights]);

//   const onDocLoadSuccess = ({ numPages }) => setNumPages(numPages);

//   // More aggressive text normalizer - removes ALL non-alphanumeric
//   const cleanText = (str) => {
//     if (!str) return "";
//     return str.toLowerCase()
//       .replace(/\s+/g, '') // Remove all whitespace
//       .replace(/[^a-z0-9]/g, ''); // Remove all special chars
//   };

//   const buildPageHighlights = async (pageIndex) => {
//     if (!url || !highlights?.length) return;

//     try {
//       const pdf = await pdfjs.getDocument(url).promise;
//       const page = await pdf.getPage(pageIndex + 1);
//       const viewport = page.getViewport({ scale: 1 });
//       const textContent = await page.getTextContent();
      
//       const items = textContent.items;
      
//       // Build a clean text string with character mapping
//       let fullPageClean = "";
//       const charMap = [];

//       items.forEach((item, itemIdx) => {
//         const str = item.str || "";
//         if (!str.trim()) return;

//         for (let charIdx = 0; charIdx < str.length; charIdx++) {
//           const char = str[charIdx];
//           // Only keep alphanumeric characters
//           if (/[a-zA-Z0-9]/.test(char)) {
//             fullPageClean += char.toLowerCase();
//             charMap.push({ itemIdx, item, originalChar: char });
//           }
//         }
//       });

//       console.log(`Page ${pageIndex + 1} clean text (first 200 chars):`, fullPageClean.substring(0, 200));

//       const foundRects = [];

//       // Search for each highlight
//       for (const h of highlights) {
//         if (!h.text) continue;
        
//         const needle = cleanText(h.text);
//         if (needle.length < 3) {
//           console.log(`Skipping short needle: "${h.text}"`);
//           continue;
//         }

//         console.log(`Searching for: "${h.text}" -> cleaned: "${needle}"`);
        
//         let startSearch = 0;
//         let matchCount = 0;
        
//         while (true) {
//           const matchIndex = fullPageClean.indexOf(needle, startSearch);
//           if (matchIndex === -1) break;

//           matchCount++;
//           const endMatchIndex = matchIndex + needle.length;
          
//           // Get involved items
//           const firstItemIdx = charMap[matchIndex]?.itemIdx;
//           const lastItemIdx = charMap[endMatchIndex - 1]?.itemIdx;
          
//           // Safety check: don't highlight if match spans too many items (likely false positive)
//           if (firstItemIdx !== undefined && lastItemIdx !== undefined) {
//             const itemSpan = Math.abs(lastItemIdx - firstItemIdx);
            
//             if (itemSpan < 25) { // Allow reasonable span
//               const involvedItems = new Set();
//               for (let k = matchIndex; k < endMatchIndex; k++) {
//                 if (charMap[k]) {
//                   involvedItems.add(charMap[k].item);
//                 }
//               }

//               // Calculate bounding box
//               let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
              
//               involvedItems.forEach((item) => {
//                 const tx = item.transform[4]; // x position
//                 const ty = item.transform[5]; // y position (baseline)
//                 const h = item.height || Math.abs(item.transform[3]) || 12;
//                 const w = item.width || (item.str.length * h * 0.5);

//                 minX = Math.min(minX, tx);
//                 minY = Math.min(minY, ty);
//                 maxX = Math.max(maxX, tx + w);
//                 maxY = Math.max(maxY, ty + h);
//               });

//               if (minX !== Infinity) {
//                 const scale = pageWidth / viewport.width;
                
//                 // Convert PDF coordinates (bottom-left origin) to DOM (top-left origin)
//                 const rect = {
//                   id: `${h.id}-${matchCount}`,
//                   left: minX * scale,
//                   top: (viewport.height - maxY) * scale,
//                   width: (maxX - minX) * scale,
//                   height: (maxY - minY) * scale,
//                   color: h.color || "rgba(255, 235, 59, 0.4)",
//                   text: h.text
//                 };
                
//                 console.log(`Found match for "${h.text}" on page ${pageIndex + 1}:`, rect);
//                 foundRects.push(rect);
//               }
//             } else {
//               console.log(`Skipping match spanning ${itemSpan} items (likely false positive)`);
//             }
//           }
          
//           startSearch = matchIndex + 1;
//         }
        
//         if (matchCount === 0) {
//           console.log(`No matches found for: "${h.text}"`);
//         }
//       }

//       setPageRects(prev => ({ ...prev, [pageIndex + 1]: foundRects }));
//     } catch (err) {
//       console.error("Error building highlights:", err);
//     }
//   };

//   return (
//     <div className="w-full relative bg-gray-100 min-h-[500px] flex flex-col items-center py-8">
//       <Document 
//         file={url} 
//         onLoadSuccess={onDocLoadSuccess}
//         loading={<div className="p-10 text-gray-500">Loading PDF...</div>}
//         error={<div className="p-10 text-red-500">Failed to load PDF. Please check the URL.</div>}
//       >
//         {Array.from(new Array(numPages || 0), (_, i) => (
//           <div key={`page-${i}`} className="relative mb-8 shadow-lg bg-white">
//             <Page
//               pageNumber={i + 1}
//               width={pageWidth}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//               onRenderSuccess={() => buildPageHighlights(i)}
//             />
            
//             {/* Render highlights */}
//             {(pageRects[i + 1] || []).map((r, ix) => (
//               <div
//                 key={`${r.id}-${ix}`}
//                 title={r.text}
//                 style={{
//                   position: "absolute",
//                   left: r.left + "px",
//                   top: r.top + "px",
//                   width: r.width + "px",
//                   height: r.height + "px",
//                   backgroundColor: r.color,
//                   mixBlendMode: "multiply",
//                   cursor: "pointer",
//                   pointerEvents: "auto",
//                   border: "1px solid rgba(0,0,0,0.15)",
//                   borderRadius: "2px",
//                   transition: "all 0.2s ease"
//                 }}
//                 className="hover:brightness-110 hover:scale-105"
//               />
//             ))}
            
//             {/* Debug indicator */}
//             {pageRects[i + 1] && pageRects[i + 1].length > 0 && (
//               <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                 {pageRects[i + 1].length} highlights
//               </div>
//             )}
//           </div>
//         ))}
//       </Document>
//     </div>
//   );
// }
// src/pages/AnalysisPDF.js
// src/pages/AnalysisPDF.js
import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function AnalysisPDFViewer({ url, highlights = [], pageWidth = 800 }) {
  const [numPages, setNumPages] = useState(null);
  const [pageRects, setPageRects] = useState({});
  const [pageElements, setPageElements] = useState({});
  
  useEffect(() => {
    if(highlights.length > 0) {
      console.log("Highlights to search:", highlights.map(h => h.text));
    }
  }, [highlights]);

  const onDocLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const normalizeText = (str) => {
    if (!str) return "";
    return str.toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  };

  const buildPageHighlights = async (pageIndex) => {
    if (!url || !highlights?.length) return;

    try {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(pageIndex + 1);
      
      // Get viewport at scale 1 first
      const viewport = page.getViewport({ scale: 1 });
      
      // Calculate the scale we're actually rendering at
      const renderScale = pageWidth / viewport.width;
      
      // Get text content
      const textContent = await page.getTextContent();
      const items = textContent.items;
      
      console.log(`Page ${pageIndex + 1}: viewport=${viewport.width}x${viewport.height}, renderScale=${renderScale}`);
      
      // Build searchable text with character-to-item mapping
      let fullText = "";
      const charToItem = [];
      
      items.forEach((item, itemIdx) => {
        const str = item.str || "";
        for (let i = 0; i < str.length; i++) {
          charToItem.push({ itemIdx, charInItem: i });
          fullText += str[i];
        }
        // Add space between items
        if (itemIdx < items.length - 1) {
          charToItem.push({ itemIdx, charInItem: -1 }); // -1 means space
          fullText += " ";
        }
      });

      const normalizedText = normalizeText(fullText);
      const foundRects = [];

      // Search for each highlight
      for (const h of highlights) {
        if (!h.text || h.text.length < 3) continue;
        
        const needle = normalizeText(h.text);
        console.log(`Searching for: "${h.text}" -> "${needle}"`);
        
        let searchPos = 0;
        let matchNum = 0;
        
        while (true) {
          const matchIdx = normalizedText.indexOf(needle, searchPos);
          if (matchIdx === -1) break;
          
          matchNum++;
          const matchEnd = matchIdx + needle.length;
          
          // Get all items involved in this match
          const involvedItems = new Set();
          for (let i = matchIdx; i < matchEnd && i < charToItem.length; i++) {
            const mapping = charToItem[i];
            if (mapping && mapping.charInItem !== -1) {
              involvedItems.add(mapping.itemIdx);
            }
          }
          
          if (involvedItems.size === 0) {
            searchPos = matchIdx + 1;
            continue;
          }
          
          // Calculate bounding box in PDF coordinates
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          
          involvedItems.forEach(idx => {
            const item = items[idx];
            if (!item?.transform) return;
            
            const [a, b, c, d, e, f] = item.transform;
            // e = x position, f = y position (baseline)
            const x = e;
            const y = f;
            
            // Calculate text height and width
            const fontSize = Math.sqrt(a * a + b * b);
            const width = item.width || (item.str.length * fontSize * 0.6);
            const height = fontSize;
            
            // Text baseline is at y, top is y + height
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x + width);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y + height);
          });
          
          if (isFinite(minX) && isFinite(minY)) {
            // Convert from PDF coordinates (origin bottom-left) to canvas coordinates (origin top-left)
            // In PDF: y increases upward from bottom
            // In canvas: y increases downward from top
            
            const canvasLeft = minX * renderScale;
            const canvasTop = (viewport.height - maxY) * renderScale;
            const canvasWidth = (maxX - minX) * renderScale;
            const canvasHeight = (maxY - minY) * renderScale;
            
            const rect = {
              id: `${h.id}-${matchNum}`,
              left: canvasLeft,
              top: canvasTop,
              width: canvasWidth,
              height: canvasHeight,
              color: h.color || "rgba(255, 235, 59, 0.4)",
              text: h.text
            };
            
            console.log(`Match ${matchNum} for "${h.text}":`, {
              pdfCoords: { minX, minY, maxX, maxY },
              canvasCoords: { left: canvasLeft, top: canvasTop, width: canvasWidth, height: canvasHeight },
              viewportHeight: viewport.height,
              renderScale
            });
            
            foundRects.push(rect);
          }
          
          searchPos = matchIdx + 1;
        }
        
        console.log(`Found ${matchNum} matches for: "${h.text}"`);
      }

      setPageRects(prev => ({ ...prev, [pageIndex + 1]: foundRects }));
    } catch (err) {
      console.error(`Error building highlights for page ${pageIndex + 1}:`, err);
    }
  };

  return (
    <div className="w-full relative bg-gray-100 min-h-[500px] flex flex-col items-center py-8">
      <Document 
        file={url} 
        onLoadSuccess={onDocLoadSuccess}
        loading={<div className="p-10 text-gray-500">Loading PDF...</div>}
        error={<div className="p-10 text-red-500">Failed to load PDF</div>}
      >
        {Array.from(new Array(numPages || 0), (_, i) => (
          <div 
            key={`page-${i}`} 
            className="relative mb-8 shadow-lg bg-white"
            style={{ lineHeight: 0 }}
          >
            <Page
              pageNumber={i + 1}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={() => {
                // Build highlights after page renders
                setTimeout(() => buildPageHighlights(i), 150);
              }}
            />
            
            {/* Overlay highlights */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ top: 0, left: 0 }}
            >
              {(pageRects[i + 1] || []).map((r, ix) => (
                <div
                  key={`highlight-${i}-${ix}`}
                  title={r.text}
                  style={{
                    position: "absolute",
                    left: `${r.left}px`,
                    top: `${r.top}px`,
                    width: `${r.width}px`,
                    height: `${r.height}px`,
                    backgroundColor: r.color,
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "2px",
                    pointerEvents: "auto",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    zIndex: 10
                  }}
                  className="hover:opacity-80"
                  onClick={() => console.log('Clicked:', r.text)}
                />
              ))}
            </div>
            
            {/* Debug counter */}
            {pageRects[i + 1] && pageRects[i + 1].length > 0 && (
              <div 
                className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
                style={{ zIndex: 20 }}
              >
                {pageRects[i + 1].length} highlights
              </div>
            )}
          </div>
        ))}
      </Document>
    </div>
  );
}