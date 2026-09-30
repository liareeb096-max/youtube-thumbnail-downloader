export default function AdBanner({ dataKey, width, height }) {
  // Yeh HTML string iframe ke andar bina React ko disturb kiye load hogi
  const adCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ad</title>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            background: transparent; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${dataKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/${dataKey}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <iframe
        srcDoc={adCode}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ display: 'block', maxWidth: '100%', background: 'transparent' }}
        title="Adsterra Ad"
      ></iframe>
    </div>
  );
}