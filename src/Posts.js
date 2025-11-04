export const posts = {
  1: {
    id: 1,
    title: "How to Get Your First Flag",
    date: "April 1, 2025",
    description: "A beginner's guide to solving your first CTF challenge",
    content:
      "Getting your first flag is a rite of passage. Start by understanding the challenge type (pwn, web, crypto, forensics). Use basic tools like `strings`, `nmap`, and Burp Suite to find initial clues. Don't be afraid to read writeups for *old* challenges to learn the mindset.",
  },
  2: {
    id: 2,
    title: "CTF Categories Explained: Web vs. Pwn",
    date: "April 1, 2024",
    description: "Understanding the common types of CTF challenges",
    content:
      "Web challenges often involve finding vulnerabilities like XSS, SQL Injection, or LFI. Pwn (binary exploitation) is about finding memory corruption bugs (like buffer overflows) to gain shell access. Both require different toolsets and ways of thinking.",
  },
  3: {
    id: 3,
    title: "Mastering Reconnaissance in CTFs",
    date: "April 1, 2023",
    description: "Why enumeration is the key to winning",
    content:
      "Never underestimate reconnaissance. Run directory busters (`gobuster`, `dirb`), check `robots.txt`, and look at the page source. Often, the flag is hidden in plain sight or in a comment. Good recon saves you hours of guessing.",
  },
  4: {
    id: 4,
    title: "Essential CTF Toolkit",
    date: "April 1, 2022",
    description: "The must-have tools for any aspiring pentester",
    content:
      "Your toolkit is your best friend. For forensics, have `Volatility` (memory) and `foremost` (file carving). For crypto, `CyberChef` is indispensable. And for everything else, know your Python scripting and how to use `gdb` for debugging binaries.",
  },
};
