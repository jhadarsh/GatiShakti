const baseTemplate = ({ title, content, logoBase64, bannerBase64 }) => {
  return `
<div style="max-width:650px;margin:auto;background:#F5E3D9;padding:30px;font-family:Arial,sans-serif;">
  <div style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">

    <!-- BANNER ON TOP -->
    <img src="data:image/png;base64,${bannerBase64}" width="100%" style="display:block;" />

    <!-- LOGO -->
    <div style="padding:25px;text-align:center;">
      <img src="data:image/png;base64,${logoBase64}" width="180" />
    </div>

    <!-- BODY -->
    <div style="padding:40px;">
      ${content}
    </div>

    <!-- FOOTER -->
    <div style="padding:20px;background:#fafafa;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;font-size:14px;color:#666;">Need Help?</p>
      <p style="margin-top:10px;font-size:14px;color:#666;">📧 support@gatishakti.com</p>
      <p style="margin:5px;font-size:14px;color:#666;">📞 +91 9876543210</p>
      <p style="margin-top:20px;font-size:12px;color:#999;">© 2026 GatiShakti</p>
    </div>

  </div>
</div>
`;
};

module.exports = baseTemplate;