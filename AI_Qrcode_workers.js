export default {
  async fetch(request, env) {
    const urlToEncode = "https://www.google.com/search?client=firefox-b-d&q=interesting+thing+ican+do+with+cloudflare+enterprise+api";
    
    // Use a free QR code generation API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(urlToEncode)}&size=500x500`;

    // Fetch the generated QR code as an image
    const qrCodeResponse = await fetch(qrCodeUrl);
    const qrCodeImage = await qrCodeResponse.arrayBuffer(); // Get the image as binary data

    // Optionally, pass the QR code image to Stable Diffusion for further processing
    const inputs = {
      prompt: 'Apply a cat theme to this QR code.And make sure that the image is still scanable,and direct to urlToEncodes url ',
      init_image: qrCodeImage,
    };

    const aiResponse = await env.AI.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs,
    );

    // Return the final image
    return new Response(aiResponse, {
      headers: {
        'content-type': 'image/png',
      },
    });
  },
};
