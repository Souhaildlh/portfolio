"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Code,
  ExternalLink,
  Github,
  Mail,
  Moon,
  Sun,
  Terminal,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalText, setTerminalText] = useState("");
  const fullText =
    "Hello World! I'm a Full Stack Developer passionate about building exceptional digital experiences.";
  const [terminalComplete, setTerminalComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Only show the UI after mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorHidden(false);
    const handleMouseLeave = () => setCursorHidden(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Terminal typing effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTerminalComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment processing and inventory management.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered application that generates marketing content based on user prompts.",
      tags: ["Next.js", "OpenAI", "Tailwind CSS", "Vercel"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
    {
      title: "Real-time Chat Application",
      description:
        "A real-time messaging platform with end-to-end encryption and file sharing.",
      tags: ["React", "Firebase", "WebSockets", "TypeScript"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
  ];

  const skills = [
    {
      name: "Frontend",
      items: [
        "React",
        "Next.js",
        "Vue.js",
        "HTML/CSS",
        "JavaScript",
        "TypeScript",
      ],
    },
    { name: "Backend", items: ["Node.js", "Python", "REST APIs"] },
    { name: "Database", items: ["MongoDB", "MySQL", "Firebase"] },
    { name: "DevOps", items: ["CI/CD", "Git", "GitHub Actions"] },
  ];

  // If not mounted yet, return null to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-primary z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          opacity: cursorHidden ? 0 : 1,
          scale: 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-primary z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: cursorPosition.x - 4,
          y: cursorPosition.y - 4,
          opacity: cursorHidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="text-primary">&lt;</span>
            <span>Dev</span>
            <span className="text-primary">/&gt;</span>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map(
              (section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize ${
                    activeSection === section
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  } hover:text-primary transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.a>
              )
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center pt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-purple-500">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background">
                  <img
                    src="/me.jpg"
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              <span className="text-primary">Souhail Delhi</span>
            </motion.h1>

            <motion.div
              ref={terminalRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full max-w-2xl bg-black/80 rounded-lg p-4 mb-8 font-mono text-sm md:text-base"
            >
              <div className="flex items-center mb-2">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#ef4444" }}
                />
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: "#eab308" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#22c55e" }}
                />
                <span className="ml-4 text-gray-400">terminal</span>
              </div>
              <div className="text-gray-200">
                <span className="text-green-400">$ </span>
                {terminalText}
                {!terminalComplete && <span className="animate-pulse">|</span>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button className="gap-2" size="lg" asChild>
                <a href="#about">
                  <User size={18} />
                  About Me
                </a>
              </Button>
              <Button variant="outline" className="gap-2" size="lg">
                <a href="#contact">
                  <Mail size={18} />
                  Contact
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown className="text-primary" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-500 rounded-lg opacity-30 blur-lg" />
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Developer working"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg mb-6">
                  I'm a passionate Web and Mobile Developer with 3 years of
                  experience creating responsive websites and cross-platform
                  mobile apps
                </p>
                <p className="text-lg mb-6">
                  My journey in software development started when I built my
                  first website at 15. Since then, I've worked with startups and
                  established companies to create scalable, efficient, and
                  beautiful applications.
                </p>
                <p className="text-lg mb-6">
                  When I'm not coding, you can find me hiking, playing video
                  games or experimenting with new technologies.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="gap-2">
                    <a href="https://github.com/Souhaildlh">
                      <Github size={18} />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <a
                      href="https://drive.google.com/file/d/1gLSRY57iYG-XDJelrtYkEW3FZIUbB1in/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Code size={20} />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-primary">Skills</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-lg p-6 shadow-lg border border-border"
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {category.name}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((skill) => (
                      <li key={skill} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-primary">Projects</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-background rounded-lg overflow-hidden border border-border shadow-lg group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" variant="secondary" className="gap-1">
                        <Github size={16} />
                        Code
                      </Button>
                      <Button size="sm" className="gap-1">
                        <ExternalLink size={16} />
                        Demo
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Let's Talk</h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas or
                  opportunities to be part of your vision.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Mail me at
                      </p>
                      <p className="font-medium">mouslim.souhail@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Call me at
                      </p>
                      <p className="font-medium">0620479804</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/Souhaildlh"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/souhail-delhi-516513221/"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-lg border border-border">
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Souhail Delhi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
