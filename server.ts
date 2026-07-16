import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client gracefully
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.error("Error initializing Gemini client:", err);
  }
} else {
  console.log("Gemini API key not found or using placeholder. Running in simulation mode.");
}

const SYSTEM_INSTRUCTION = `You are SentinelAI Copilot, an elite AI Security Analyst embedded in a high-security Banking Security Operations Center (SOC).
Your focus is global banking infrastructure, insider threat mitigation, and privileged access monitoring.

Currently, you are assisting the SOC team in investigating Incident INC-9921:
- Target Profile: Rahul S., Senior Database Administrator (DBA), Engineering Department.
- Device: MAC-ENG-892
- Security incident: Rahul was automatically blocked due to anomalous activity at 11:52 PM.
- Context of block:
  1. Login Anomaly: Geographic jump (impossible travel) to Moscow, Russia VPN while his active local session was running.
  2. Database Access: Unauthorized query to sensitive Customer PII Database (specifically Table 'Customer_PII_Q3') outside his standard working hours.
  3. Exfiltration Risk: High-velocity encrypted transfer downloading 4.8GB (approx 12,000 sensitive records) to an untrusted IP.
  4. Physical Trigger: An unregistered USB Mass Storage device (Kingston 128GB) was mounted on MAC-ENG-892 at 11:55 PM.
- Enforcement: Auto-session terminated at 11:58 PM via Sentinel Policy [EXFIL-09]. Current Account status is Suspend/Locked.

Respond as an expert security officer. Be direct, professional, technical, and precise. Avoid casual filler. Keep responses concise and highly structured (using bullets or markdown where appropriate). If the user asks general questions about SentinelAI, describe the platform's core architectural advantages, such as continuous behavioral baselining, post-quantum cryptography (quantum-safe vault), and automatic SOAR (Security Orchestration, Automation, and Response) enforcement.`;

// Mock intelligent fallback responder
function generateMockResponse(prompt: string): string {
  const query = prompt.toLowerCase();
  
  if (query.includes("why") && (query.includes("blocked") || query.includes("block") || query.includes("rahul"))) {
    return `### Incident INC-9921 Analysis - Block Justification

Rahul S. was automatically suspended and blocked from all active sessions at **11:58 PM UTC** due to a critical policy violation under Sentinel Rule **[EXFIL-09]**.

Here is the sequential trigger analysis:
1. **Impossible Travel Anomaly (11:45 PM):** Active login detected from a Moscow, Russia VPN gateway while Rahul was logged in from his registered location.
2. **PII Database Access Violation (11:45 PM):** Rahul queried the sensitive \`Customer_PII_Q3\` database table, which is outside his standard operational baseline as DBA.
3. **Data Exfiltration Spike (11:52 PM):** High-velocity transfer of **4.8 GB of encrypted database backups** to an untrusted external IP address.
4. **USB Mounting (11:55 PM):** Physical mount of an unregistered **Kingston 128GB USB device** detected on MAC-ENG-892.

**Current Recommendation:** Keep account strictly suspended. Dispatch physical security to check his onsite workspace, reset all MFA credentials, and initiate a deep-dive forensic audit of MAC-ENG-892.`;
  }
  
  if (query.includes("mitre") || query.includes("attack") || query.includes("matrix")) {
    return `### MITRE ATT&CK Matrix Mapping for Incident INC-9921

The active threat triggers align with multiple tactics from the MITRE ATT&CK framework:

- **T1078 - Valid Accounts (Initial Access / Privilege Escalation):** Bypassed standard SSO protocols using credentials originating from a Russian VPN IP.
- **T1114 - Email/Database Collection (Collection):** Queried non-routine databases containing sensitive customer PII.
- **T1048 - Exfiltration Over Alternative Physical/Logical Protocol (Exfiltration):** Transferred 4.8 GB to an external endpoint over encrypted logical channels and physically mounted an unregistered USB device.
- **T1090 - Proxy (Defense Evasion):** Attempted to route authentication through a Russian proxy/VPN subnet to obfuscate origin.`;
  }

  if (query.includes("report") || query.includes("summary") || query.includes("generate")) {
    return `### OFFICIAL INCIDENT SUMMARY REPORT (INC-9921)
**Date:** July 16, 2026
**Subject:** Potential Credential Compromise / Insider Threat (DBA Rahul S.)
**Severity:** Critical (Risk Score: 96%)

---

#### 1. Executive Summary
At 11:52 PM UTC, the SentinelAI Cognitive Engine flagged an anomalous data exfiltration event of **4.8 GB** from the \`Customer_PII_Q3\` primary tables. Investigation revealed valid DBA credentials being exercised from a Moscow, RU geolocation. Automated SOAR playbook rules triggered account lockdown at 11:58 PM UTC.

#### 2. Key Forensic Logs
- **11:45 PM:** SSO Login Accepted - IP \`82.102.23.11\` (RU subnet via OpenVPN).
- **11:45 PM:** Table Query executed against \`Customer_PII_Q3.PII_Main\`.
- **11:52 PM:** 4.8 GB egress transfer completed.
- **11:55 PM:** Local event on device \`MAC-ENG-892\` - USB Device Registered (Vendor: Kingston, Serial: KNG-8921-X).
- **11:58 PM:** Active sessions revoked. Sentinel Rule \`EXFIL-09\` active.

#### 3. Prescribed Actions
1. Keep the active account **suspended**.
2. Revoke and rotate all database master passwords and system access keys.
3. Require mandatory physical security verification for Rahul S. before account restoration.
4. Quarantine device \`MAC-ENG-892\` for local malware scanning.`;
  }

  if (query.includes("quantum") || query.includes("vault") || query.includes("safe")) {
    return `### SentinelAI Quantum Vault Architecture

The **Quantum Vault** status is currently **Secure and Healthy**. 

SentinelAI utilizes post-quantum cryptography standards (such as **Kyber** for key encapsulation and **Dilithium** for digital signatures) to protect institutional databases against prospective quantum decrypt-and-harvest attacks. 

Even if the database backups exfiltrated in INC-9921 were captured, they are secured behind quantum-safe envelope encryption, meaning they remain indecipherable by legacy and quantum computers alike.`;
  }

  return `### SentinelAI Security Analysis Response

Hello, SOC Operator. I am analyzing your request regarding our current threat posture:

- **Active Incidents:** 1 Critical (INC-9921 - Rahul S. DBA)
- **Primary Attack Vectors:** Credential Compromise, anomalous database query activity, and USB exfiltration.
- **System Health:** 100% (All endpoints and Quantum Vault processes operating nominally).

Please ask specifically about:
- *"Why was Rahul blocked?"* (Detailed timeline analysis)
- *"Show MITRE ATT&CK mapping"* (Tactics, Techniques, and Procedures)
- *"Generate an incident summary report"* (Draft formal incident compliance log)
- *"What is the Quantum Vault status?"* (Cryptographic health)

Let me know how you wish to proceed with the Playbook enforcement.`;
}

// API endpoint for AI Copilot
app.post("/api/copilot", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const userMessage = messages[messages.length - 1]?.text || "";

  if (ai) {
    try {
      // Map user chat format to Gemini contents format
      const contents = messages.map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "No response received from SentinelAI.";
      return res.json({ text: responseText });
    } catch (err) {
      console.error("Gemini API call failed, falling back to local simulation logic:", err);
      // Fallback to mock logic if the API fails at runtime
      return res.json({ text: generateMockResponse(userMessage) + "\n\n*(Note: Operating in secure offline fallback mode)*" });
    }
  } else {
    // Return mock response immediately if no key configured
    setTimeout(() => {
      return res.json({ text: generateMockResponse(userMessage) });
    }, 600); // Add minor natural lag
  }
});

// Configure Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SentinelAI SOC Server running on http://localhost:${PORT}`);
  });
}

startServer();
