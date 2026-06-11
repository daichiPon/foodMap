import type React from "react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import jsQR from "jsqr";

const QR_PREFIX = "foodmap:follow:";

type Props = {
  userId: string;
  username: string;
  onClose: () => void;
  /** スキャン成功時にフォロー対象の userId を返す */
  onScanned: (targetId: string) => void;
};

/** マイQR表示＋カメラスキャンのボトムシート */
export default function QRFollowSheet({ userId, username, onClose, onScanned }: Props) {
  const [mode, setMode] = useState<"show" | "scan">("show");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const scannedRef = useRef(false);

  /** マイQR生成 */
  useEffect(() => {
    QRCode.toDataURL(`${QR_PREFIX}${userId}`, {
      width: 260,
      margin: 2,
      color: { dark: "#1A1D21", light: "#FFFFFF" },
    })
      .then(setQrDataUrl)
      .catch((err) => console.error("QR生成エラー:", err));
  }, [userId]);

  /** スキャンモード: カメラ起動＋QR検出ループ */
  useEffect(() => {
    if (mode !== "scan") return;

    scannedRef.current = false;
    setCameraError(null);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const tick = () => {
      const video = videoRef.current;
      if (video && ctx && video.readyState === video.HAVE_ENOUGH_DATA && !scannedRef.current) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code?.data.startsWith(QR_PREFIX)) {
          scannedRef.current = true;
          onScanned(code.data.slice(QR_PREFIX.length));
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        rafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => setCameraError("カメラを起動できません。ブラウザの権限設定を確認してください。"));

    return () => {
      cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [mode, onScanned]);

  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "10px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 700,
    background: active ? "var(--text)" : "transparent",
    color: active ? "white" : "var(--text-sub)",
    transition: "background 0.2s, color 0.2s",
  });

  return (
    <>
      <div
        className="anim-fade-in"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 30 }}
      />

      <div
        className="anim-slide-up"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          boxSizing: "border-box",
          background: "var(--surface)",
          borderTopLeftRadius: "22px",
          borderTopRightRadius: "22px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
          padding: "0 20px",
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 31,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "5px",
            borderRadius: "3px",
            background: "#d8dade",
            margin: "10px auto 2px",
          }}
        />

        <div style={{ display: "flex", gap: "4px", background: "#f3f4f6", borderRadius: "14px", padding: "3px" }}>
          <button className="press" style={tabBtn(mode === "show")} onClick={() => setMode("show")}>
            マイQR
          </button>
          <button className="press" style={tabBtn(mode === "scan")} onClick={() => setMode("scan")}>
            スキャン
          </button>
        </div>

        {mode === "show" ? (
          <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="マイQRコード"
                style={{ width: "220px", height: "220px", borderRadius: "16px" }}
              />
            ) : (
              <p style={{ color: "var(--text-sub)" }}>QR生成中...</p>
            )}
            <p style={{ margin: "8px 0 0", fontWeight: 700 }}>👤 {username}</p>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-sub)" }}>
              友だちにスキャンしてもらうとフォローされます
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4px 0" }}>
            {cameraError ? (
              <p style={{ color: "#E53935", fontSize: "14px", padding: "24px 0" }}>{cameraError}</p>
            ) : (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    borderRadius: "16px",
                    background: "#000",
                    objectFit: "cover",
                  }}
                />
                <p style={{ margin: "8px 0 0", fontSize: "13px", color: "var(--text-sub)" }}>
                  友だちのQRコードを画面に映してください
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
