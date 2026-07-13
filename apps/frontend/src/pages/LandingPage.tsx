import { useState } from "react";
import AuthModal from "../components/auth/AuthModal";

export default function LandingPage() {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a 0%, #111827 45%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Hero */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            Trip_Adviser.AI
          </h1>

          <p
            style={{
              fontSize: "1.5rem",
              color: "#cbd5e1",
              maxWidth: "850px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Plan smarter journeys using multiple AI agents working together.
            <br />
            Destination • Itinerary • Budget
            <br />
            One orchestrated response.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                setIsLogin(false);
                setOpenModal(true);
              }}
              style={{
                padding: "15px 34px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Get Started
            </button>

            <button
              onClick={() => {
                setIsLogin(true);
                setOpenModal(true);
              }}
              style={{
                padding: "15px 34px",
                borderRadius: "10px",
                border: "1px solid #64748b",
                background: "transparent",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Login
            </button>
          </div>
        </section>

        {/* Features */}

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "50px 24px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "50px",
            }}
          >
            Why Trip_Adviser.AI?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
            }}
          >
            {[
              {
                icon: "🗺️",
                title: "Destination Agent",
                text: "Suggests destinations matching your interests and budget.",
              },
              {
                icon: "📅",
                title: "Itinerary Agent",
                text: "Creates realistic day-by-day travel plans.",
              },
              {
                icon: "💰",
                title: "Budget Agent",
                text: "Ensures your trip stays within budget.",
              },
              {
                icon: "🤖",
                title: "AI Orchestrator",
                text: "Coordinates every AI agent into one final answer.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "16px",
                  padding: "30px",
                  textAlign: "center",
                  border: "1px solid #334155",
                }}
              >
                <div style={{ fontSize: "3rem" }}>{item.icon}</div>

                <h3
                  style={{
                    marginTop: "20px",
                    marginBottom: "15px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}

        <section
          style={{
            maxWidth: "1000px",
            margin: "80px auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "60px",
            }}
          >
            Multi-Agent Workflow
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {[
              "User",
              "AI",
              "Destination",
              "Itinerary",
              "Budget",
              "Response",
            ].map((step, index) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "#2563eb",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                  }}
                >
                  {step}
                </div>

                {index !== 5 && (
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "2rem",
                      margin: "0 15px",
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer
          style={{
            marginTop: "100px",
            padding: "30px",
            borderTop: "1px solid #334155",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          <h3>Trip_Adviser.AI</h3>

          <p style={{ marginTop: "10px" }}>
            React • Node.js • Prisma • Gemini • Groq
          </p>

          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Multi-Agent AI Travel Planner
          </p>
        </footer>

        <AuthModal
          key={isLogin ? "login" : "register"}
          open={openModal}
          isLogin={isLogin}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </>
  );
}
