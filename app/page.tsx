"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Brain,
  Server,
  ChevronDown,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Sun,
  Moon,
  GraduationCap,
  Phone,
  Building,
  Users,
  Zap,
  Target,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { sendContactEmail } from "./actions/send-email"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isThemeChanging, setIsThemeChanging] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Contact form state
  const [state, formAction, isPending] = useActionState(sendContactEmail, null)

  useEffect(() => {
    setIsVisible(true)

    // Intersection Observer for scroll animations - triggers on both scroll up and down
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id

          if (entry.isIntersecting || isThemeChanging) {
            setActiveSection(sectionId)

            // Track About section visibility
            if (sectionId === "about") {
              setIsAboutVisible(true)
            }

            // Add animation class to the section
            entry.target.classList.add("slide-in-active")

            // Animate child elements with stagger
            const childElements = entry.target.querySelectorAll(".slide-item")
            childElements.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("slide-in-active")
              }, index * 150)
            })
          } else if (!isThemeChanging) {
            // Track when About section leaves viewport
            if (sectionId === "about") {
              setIsAboutVisible(false)
            }

            // Only remove animation classes when not changing themes and not HOME section
            if (sectionId !== "home") {
              entry.target.classList.remove("slide-in-active")

              // Remove animation from child elements
              const childElements = entry.target.querySelectorAll(".slide-item")
              childElements.forEach((child) => {
                child.classList.remove("slide-in-active")
              })
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-80px 0px -50px 0px",
      },
    )

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [isThemeChanging])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false) // Close mobile menu after navigation
    }
  }

  const toggleTheme = () => {
    setIsThemeChanging(true)
    setIsDarkMode(!isDarkMode)

    // Reset theme changing state after transition
    setTimeout(() => {
      setIsThemeChanging(false)
    }, 600)
  }

  const backgroundClass = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-black"
    : "bg-gradient-to-br from-white via-gray-50 to-white"

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          isDarkMode ? "bg-black/20 backdrop-blur-md border-white/10" : "bg-white/20 backdrop-blur-md border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`font-bold text-lg sm:text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Revanth Padala
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav hidden md:flex space-x-6 lg:space-x-8 items-center">
              {["home", "about", "education", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors duration-200 capitalize ${
                    activeSection === section
                      ? isDarkMode
                        ? "text-blue-400"
                        : "text-blue-600"
                      : isDarkMode
                        ? "text-white/70 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section}
                </button>
              ))}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-full ${
                  isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-black/10"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="mobile-nav flex md:hidden items-center space-x-2">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-full ${
                  isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-black/10"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-full ${
                  isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-black/10"
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden border-t transition-all duration-300 ${
                isDarkMode ? "border-white/10 bg-black/40" : "border-black/10 bg-white/40"
              } backdrop-blur-md`}
            >
              <div className="px-4 py-4 space-y-3 max-w-full overflow-x-hidden">
                {["home", "about", "education", "skills", "projects", "experience", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-base font-medium transition-colors duration-200 capitalize ${
                      activeSection === section
                        ? isDarkMode
                          ? "text-blue-400 bg-blue-400/10"
                          : "text-blue-600 bg-blue-600/10"
                        : isDarkMode
                          ? "text-white/70 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center relative overflow-hidden slide-up ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        {/* Subtle overlay */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-600/10 to-blue-600/10"
              : "bg-gradient-to-r from-blue-300/5 to-indigo-300/5"
          }`}
        ></div>
        <div className="absolute inset-0">
          <div className="floating-shapes">
            <div className={`shape shape-1 ${isDarkMode ? "bg-blue-500/20" : "bg-blue-400/10"}`}></div>
            <div className={`shape shape-2 ${isDarkMode ? "bg-blue-500/20" : "bg-indigo-400/10"}`}></div>
            <div className={`shape shape-3 ${isDarkMode ? "bg-indigo-500/20" : "bg-blue-500/10"}`}></div>
          </div>
        </div>

        <div
          className={`text-center z-10 px-4 sm:px-6 transition-all duration-1000 hero-content max-w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 sm:mb-8">
            <div
              className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 profile-image-mobile mx-auto mb-4 sm:mb-6 rounded-full p-1 animate-pulse ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/images/profile-photo.jpg"
                  alt="Revanth Padala - Professional Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 typing-animation ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Revanth Padala
          </h1>
          <div
            className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 slide-up-animation ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Software Engineer, Backend Engineer & ML Engineer
          </div>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 slide-up-animation-delay px-4 ${
              isDarkMode ? "text-white/80" : "text-gray-700"
            }`}
          >
            MS in Information Systems @ Northeastern University | Crafting scalable systems and intelligent ML solutions
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center slide-up-animation-delay-2 px-4">
            <Button
              onClick={() => scrollToSection("projects")}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8 slide-up-animation-delay-3">
            <Link
              href="https://github.com/RevanthPadala7976"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link transition-all duration-200 hover:scale-110 transform ${
                isDarkMode ? "text-white/70 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Github className="w-7 h-7 sm:w-8 sm:h-8" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/revanth-padala"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link transition-all duration-200 hover:scale-110 transform ${
                isDarkMode ? "text-white/70 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className={`social-link transition-all duration-200 hover:scale-110 transform ${
                isDarkMode ? "text-white/70 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>

        <div
          className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
            isAboutVisible ? "opacity-0" : "animate-smooth-down opacity-100"
          } ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 slide-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              About Me
            </h2>
            <div
              className={`w-24 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
          </div>

          <div className="about-grid grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 slide-item">
              <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? "text-white/80" : "text-gray-700"}`}>
                I'm a passionate Backend Engineer and Machine Learning Engineer currently pursuing my Master's in
                Information Systems at Northeastern University. With professional experience at Cecil Labs and
                Cognizant, I specialize in building scalable distributed systems and deploying intelligent ML solutions.
              </p>
              <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? "text-white/80" : "text-gray-700"}`}>
                My expertise spans cloud technologies (Azure, AWS, GCP), modern backend frameworks, and cutting-edge
                ML/AI technologies including deep learning, NLP, and computer vision. I'm passionate about solving
                complex problems through elegant, scalable solutions.
              </p>

              <div className="about-stats grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div
                  className={`text-center p-3 sm:p-4 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                  }`}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                  >
                    15+
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                    Projects Completed
                  </div>
                </div>
                <div
                  className={`text-center p-3 sm:p-4 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                  }`}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                  >
                    3+
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                    Years Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="relative slide-item">
              <div
                className={`about-visual w-full h-64 sm:h-80 lg:h-96 rounded-2xl flex items-center justify-center ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600/20 to-indigo-600/20"
                    : "bg-gradient-to-br from-blue-300/30 to-indigo-300/30"
                }`}
              >
                <div className="text-center">
                  <Brain
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 animate-pulse ${
                      isDarkMode ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                  <p className={`text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                    Backend + ML = Innovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 sm:py-16 lg:py-20 slide-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Education
            </h2>
            <div
              className={`w-24 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto slide-item">
            <Card
              className={`education-card backdrop-blur-sm transition-all duration-300 hover:scale-105 mobile-card-padding ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/50 border-black/10 hover:bg-white/70"
              }`}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="education-header flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? "bg-blue-600/20" : "bg-blue-500/20"}`}>
                      <GraduationCap
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h3
                          className={`education-title text-xl sm:text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          Master of Science in Information Systems
                        </h3>
                      </div>
                      <p
                        className={`font-semibold text-base sm:text-lg ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                      >
                        Northeastern University
                      </p>
                      <div className={`flex items-center mt-2 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Boston, MA
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <div className={`flex items-center ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Expected May 2025
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-base sm:text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Relevant Coursework:
                  </h4>
                  <div className="coursework-grid grid md:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      "Application Engineering and Development",
                      "Database Management and Database Design",
                      "Program Structures and Algorithms",
                      "Data Science Engineering Methods and Tools",
                      "Natural Language Processing",
                      "Neural Networks",
                      "Design Patterns",
                      "Big-data Systems and Intelligent Analytics",
                    ].map((course, index) => (
                      <div
                        key={index}
                        className={`flex items-center text-sm sm:text-base ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                      >
                        <Award
                          className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                        />
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 lg:py-20 slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Skills & Technologies
            </h2>
            <div
              className={`w-24 h-1 mx-auto mb-4 sm:mb-6 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
            <p
              className={`section-subtitle text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
            >
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="skills-grid grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Programming */}
            <div className="slide-item">
              <div
                className={`mobile-card-padding p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full ${
                  isDarkMode ? "bg-white/5 border border-white/10" : "bg-white/50 border border-black/10"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Programming
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Java", "C", "C++", "Python", "HTML", "CSS", "JavaScript", "SQL", "PL/SQL", "R Programming"].map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`skill-badge px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          isDarkMode
                            ? "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-400/30"
                            : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border-blue-500/30"
                        }`}
                      >
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Machine Learning */}
            <div className="slide-item">
              <div
                className={`mobile-card-padding p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full ${
                  isDarkMode ? "bg-white/5 border border-white/10" : "bg-white/50 border border-black/10"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Machine Learning
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    "TensorFlow",
                    "PyTorch",
                    "BERT",
                    "Scikit-Learn",
                    "Fine-Tuning",
                    "LLMs",
                    "RAG",
                    "Deep Learning",
                    "Natural Language Processing",
                    "Supervised Learning",
                    "Classification",
                    "Regression",
                    "Naive Bayes",
                    "Random Forest",
                    "Decision Trees",
                    "Support Vector Machine",
                    "Unsupervised Learning",
                    "K-Means Cluster",
                    "CNN",
                    "RNN",
                    "DNN",
                    "Transformers",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`skill-badge px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "bg-green-600/20 text-green-300 hover:bg-green-600/30 border-green-400/30"
                          : "bg-green-500/20 text-green-600 hover:bg-green-500/30 border-green-500/30"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Frameworks and Tools */}
            <div className="slide-item">
              <div
                className={`mobile-card-padding p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full ${
                  isDarkMode ? "bg-white/5 border border-white/10" : "bg-white/50 border border-black/10"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Frameworks and Tools
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    "Spring Boot",
                    "FastAPI",
                    "Flask",
                    "REST APIs",
                    "Streamlit",
                    "GitHub",
                    "Jupyter Notebooks",
                    "IntelliJ",
                    "Netbeans",
                    "Eclipse",
                    "Visual Studio Code",
                    "Agile/Scrum Methodologies",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`skill-badge px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border-purple-400/30"
                          : "bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border-purple-500/30"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Cloud and DevOps */}
            <div className="slide-item">
              <div
                className={`mobile-card-padding p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full ${
                  isDarkMode ? "bg-white/5 border border-white/10" : "bg-white/50 border border-black/10"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Cloud and DevOps
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Azure", "AWS", "Google Cloud (GCP)", "Git", "GitHub Actions", "CI/CD", "Docker"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`skill-badge px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "bg-orange-600/20 text-orange-300 hover:bg-orange-600/30 border-orange-400/30"
                          : "bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 border-orange-500/30"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Databases - Centered in grid */}
            <div className="slide-item lg:col-span-2 flex justify-center">
              <div
                className={`mobile-card-padding p-6 sm:p-8 rounded-2xl backdrop-blur-sm w-full max-w-2xl ${
                  isDarkMode ? "bg-white/5 border border-white/10" : "bg-white/50 border border-black/10"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Databases
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {["Oracle SQL", "MySQL", "PostgreSQL", "CosmosDB", "DynamoDB", "RDB"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`skill-badge px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "bg-red-600/20 text-red-300 hover:bg-red-600/30 border-red-400/30"
                          : "bg-red-500/20 text-red-600 hover:bg-red-500/30 border-red-500/30"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 slide-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Featured Projects
            </h2>
            <div
              className={`w-24 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
          </div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
            {[
              {
                title: "Text-to-Image Generation",
                description:
                  "Crafted a fine-tuned Latent Diffusion Model by leveraging pre-trained CLIP, VAE, and U-Net models on SageMaker, achieving 90% alignment accuracy between text prompts and generated images on a test dataset.",
                tags: ["PyTorch", "AWS SageMaker", "CLIP", "VAE", "U-Net"],
                icon: <Brain className="w-6 h-6" />,
                achievements: [
                  "90% alignment accuracy achieved",
                  "Built efficient PyTorch data pipeline",
                  "Enhanced image generation quality by 25%",
                  "Processed 500+ images with 30% speed boost",
                ],
                link: "https://github.com/RevanthPadala7976/Text-to-Image-Generation",
              },
              {
                title: "Stock Price Analyzer using News",
                description:
                  "Leveraged an NLP pipeline with DistilBERT to analyze 150+ Apple-related articles for text processing and sentiment scoring (-1 to 1). Implemented RAG to retrieve relevant document chunks for fine-tuning.",
                tags: ["NLP", "DistilBERT", "RAG", "BERT", "Sentiment Analysis"],
                icon: <TrendingUp className="w-6 h-6" />,
                achievements: [
                  "Analyzed 150+ Apple articles",
                  "Reduced irrelevant data by 40%",
                  "Enhanced sentiment score accuracy with RAG",
                  "Identified 33% delayed effect over 3 weeks",
                ],
                link: null,
              },
              {
                title: "Deep Learning for Autonomous Driving",
                description:
                  "Orchestrated image merging and object detection workflows using YOLO models, PyTorch, and OpenCV, attaining over 90% precision to elevate dataset applicability in autonomous driving.",
                tags: ["YOLO", "PyTorch", "OpenCV", "TensorFlow", "Computer Vision"],
                icon: <Brain className="w-6 h-6" />,
                achievements: [
                  "90%+ precision in object detection",
                  "Cut preprocessing time by 25%",
                  "98% accuracy in 3D coordinate framework",
                  "Enhanced spatial representation",
                ],
                link: null,
              },
              {
                title: "Business Product Hub",
                description:
                  "Programmed a responsive web application using React, SCSS, Python (FastAPI), and MySQL, implementing secure user authentication with JWT tokens and created RESTful APIs for product data management.",
                tags: ["React", "FastAPI", "MySQL", "JWT", "SCSS"],
                icon: <Code className="w-6 h-6" />,
                achievements: [
                  "Secure JWT authentication implemented",
                  "RESTful APIs for product management",
                  "Search and filter functionality",
                  "Responsive across all devices",
                ],
                link: "https://github.com/RevanthPadala7976/BusinessProductHub",
              },
              {
                title: "Smart Home Automation Database",
                description:
                  "Conceptualized a robust smart home device database system using SQL, significantly enhancing efficiency and organization in device management processes.",
                tags: ["SQL", "Database Design", "System Architecture", "Data Management"],
                icon: <Database className="w-6 h-6" />,
                achievements: [
                  "Enhanced efficiency in device management",
                  "Improved real-time data tracking accuracy",
                  "Reduced system failure by 40%",
                  "Improved operational efficiency by 30%",
                ],
                link: "https://github.com/RevanthPadala7976/SmartHomeDB",
              },
              {
                title: "Equity Elite: Stock Exchange Operations",
                description:
                  "Architected an MVC Design Pattern in Java Swing for modular architecture, boosting scalability and maintainability; minimized debugging time by 30% and amplified code reusability by 40%.",
                tags: ["Java", "MVC", "GCP", "OOP", "Java Swing"],
                icon: <Server className="w-6 h-6" />,
                achievements: [
                  "Minimized debugging time by 30%",
                  "Amplified code reusability by 40%",
                  "Elevated system throughput by 25%",
                  "Successfully deployed on Google Cloud",
                ],
                link: "https://github.com/RevanthPadala7976/EquityElite",
              },
            ].map((project, index) => {
              const CardContentComponent = (
                <Card
                  key={index}
                  className={`project-card backdrop-blur-sm transition-all duration-300 hover:scale-105 group slide-item mobile-card-padding ${
                    project.link ? "cursor-pointer" : ""
                  } ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white/50 border-black/10 hover:bg-white/70"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30"
                              : "bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/30"
                          }`}
                        >
                          {project.icon}
                        </div>
                        <CardTitle
                          className={`project-title text-base sm:text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {project.title}
                        </CardTitle>
                      </div>
                      {project.link && (
                        <ExternalLink
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                            isDarkMode
                              ? "text-white/50 group-hover:text-blue-400"
                              : "text-gray-500 group-hover:text-blue-500"
                          }`}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription
                      className={`project-description mb-4 text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                    >
                      {project.description}
                    </CardDescription>

                    <div className="mb-4">
                      <h4
                        className={`text-xs sm:text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, i) => (
                          <li
                            key={i}
                            className={`project-achievements text-xs flex items-center ${isDarkMode ? "text-white/60" : "text-gray-600"}`}
                          >
                            <Target
                              className={`w-3 h-3 mr-2 flex-shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-tags flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={`project-tag text-xs ${
                            isDarkMode
                              ? "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30"
                              : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )

              return project.link ? (
                <Link key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  {CardContentComponent}
                </Link>
              ) : (
                <div key={index}>{CardContentComponent}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 lg:py-20 slide-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Professional Experience
            </h2>
            <div
              className={`w-24 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                title: "Backend & Machine Learning Engineer",
                company: "Cecil Labs",
                period: "Jan 2025 - Present",
                location: "Boston, MA",
                description:
                  "Spearheaded the design and deployment of a scalable matchmaking platform on Azure, creating a distributed storage and query system with Cosmos DB and Blob Storage that boosted system performance by 40%.",
                achievements: [
                  "Spearheaded design and deployment of scalable matchmaking platform on Azure",
                  "Developed and deployed predictive ML algorithm increasing successful brand-player pairing by 98.24%",
                  "Instituted robust backend using Python Flask achieving 95% uptime during peak usage",
                  "Revitalized database efficiency with TTL containers in Azure Cosmos DB, reducing data load by 50%",
                  "Augmented front-end functionality using HTML, CSS, and JavaScript with CI/CD pipelines",
                ],
                icon: <Building className="w-6 h-6" />,
                metrics: [
                  { label: "Performance Boost", value: "40%" },
                  { label: "System Uptime", value: "95%" },
                  { label: "ML Pairing Success", value: "98.24%" },
                  { label: "Data Load Reduction", value: "50%" },
                ],
              },
              {
                title: "Software Developer",
                company: "Cognizant",
                period: "Feb 2021 - Jul 2023",
                location: "Remote",
                description:
                  "Engineered and developed a cloud-based Employee Time Tracking and Reporting System on AWS using AWS Lambda, S3, and RDS (Oracle SQL), ensuring scalability to handle 10,000+ concurrent users.",
                achievements: [
                  "Engineered cloud-based Employee Time Tracking System on AWS handling 10,000+ concurrent users",
                  "Collaborated with Kronos WFC V8.0 team in configuration, testing, and interface development",
                  "Developed RESTful APIs using Java Spring Boot for seamless integration with latency under 1 second",
                  "Implemented push notifications for critical timekeeping events, improving user engagement by 25%",
                  "Achieved 90%+ code coverage with Unit Testing, ensuring robust functionality",
                  "Mentored 2 junior engineers on Kronos Workforce timekeeping systems",
                ],
                icon: <Users className="w-6 h-6" />,
                metrics: [
                  { label: "Concurrent Users", value: "10,000+" },
                  { label: "API Latency", value: "<1s" },
                  { label: "User Engagement", value: "+25%" },
                  { label: "Code Coverage", value: "90%+" },
                ],
              },
            ].map((job, index) => (
              <Card
                key={index}
                className={`experience-card backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] slide-item mobile-card-padding ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/50 border-black/10 hover:bg-white/70"
                }`}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="experience-header flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          isDarkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {job.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {job.title}
                        </h3>
                        <p
                          className={`font-medium text-base sm:text-lg ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                        >
                          {job.company}
                        </p>
                        <div
                          className={`flex items-center mt-2 text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-left lg:text-right mt-4 lg:mt-0">
                      <div
                        className={`flex items-center text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {job.period}
                      </div>
                    </div>
                  </div>

                  <p className={`mb-4 sm:mb-6 text-base sm:text-lg ${isDarkMode ? "text-white/80" : "text-gray-700"}`}>
                    {job.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="experience-metrics grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {job.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className={`experience-metric text-center p-2 sm:p-3 rounded-lg ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}
                      >
                        <div
                          className={`experience-metric-value text-lg sm:text-2xl font-bold mb-1 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                        >
                          {metric.value}
                        </div>
                        <div className={`text-xs ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4
                      className={`text-base sm:text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Key Achievements:
                    </h4>
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className={`flex items-start text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                        >
                          <Zap
                            className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                          />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 slide-item">
            <h2
              className={`section-title text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Let's Connect
            </h2>
            <div
              className={`w-24 h-1 mx-auto mb-4 sm:mb-6 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            ></div>
            <p
              className={`section-subtitle text-base sm:text-xl max-w-2xl mx-auto ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
            >
              Ready to collaborate? Let's turn ideas into reality together.
            </p>
          </div>

          {/* Interactive Contact Cards */}
          <div className="contact-cards contact-grid grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12 sm:mb-16">
            {[
              {
                icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Email",
                value: "padala.r@northeastern.edu",
                link: "mailto:padala.r@northeastern.edu",
                color: "blue",
                description: "Drop me a line anytime",
              },
              {
                icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Phone",
                value: "857-540-2919",
                link: "tel:857-540-2919",
                color: "green",
                description: "Let's have a conversation",
              },
              {
                icon: <Linkedin className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "LinkedIn",
                value: "revanth-padala",
                link: "https://www.linkedin.com/in/revanth-padala",
                color: "indigo",
                description: "Connect professionally",
              },
              {
                icon: <Github className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "GitHub",
                value: "RevanthPadala7976",
                link: "https://github.com/RevanthPadala7976",
                color: "purple",
                description: "Check out my code",
              },
            ].map((contact, index) => (
              <div key={index} className="slide-item">
                <Link
                  href={contact.link}
                  target={contact.link.startsWith("http") ? "_blank" : "_self"}
                  rel={contact.link.startsWith("http") ? "noopener noreferrer" : ""}
                  className="block group"
                >
                  <Card
                    className={`contact-card backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer h-full mobile-card-padding ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/25"
                        : "bg-white/50 border-black/10 hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/25"
                    }`}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div
                        className={`inline-flex p-3 sm:p-4 rounded-full mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 ${
                          contact.color === "blue"
                            ? isDarkMode
                              ? "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30"
                              : "bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/30"
                            : contact.color === "green"
                              ? (
                                  isDarkMode
                                    ? "bg-green-600/20 text-green-400 group-hover:bg-green-600/30"
                                    : "bg-green-500/20 text-green-500 group-hover:bg-green-500/30"
                                )
                              : contact.color === "indigo"
                                ? isDarkMode
                                  ? "bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600/30"
                                  : "bg-indigo-500/20 text-indigo-500 group-hover:bg-indigo-500/30"
                                : isDarkMode
                                  ? "bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30"
                                  : "bg-purple-500/20 text-purple-500 group-hover:bg-purple-500/30"
                        }`}
                      >
                        {contact.icon}
                      </div>
                      <h3
                        className={`font-semibold text-base sm:text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {contact.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mb-2 font-mono ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                      >
                        {contact.value}
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-white/50" : "text-gray-500"}`}>
                        {contact.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

          {/* Animated CTA Section */}
          <div className="text-center slide-item">
            <div
              className={`contact-cta relative inline-block p-6 sm:p-8 rounded-3xl backdrop-blur-sm max-w-full ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-white/10"
                  : "bg-gradient-to-r from-blue-300/30 to-indigo-300/30 border border-black/10"
              }`}
            >
              {/* Floating elements */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/30 animate-bounce"></div>
              <div
                className="absolute -top-2 -right-4 sm:-right-6 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-indigo-500/30 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -bottom-2 left-6 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/30 animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative z-10">
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Ready to Start Something Amazing?
                </h3>
                <p
                  className={`text-sm sm:text-lg mb-4 sm:mb-6 max-w-md mx-auto ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                >
                  Whether it's a groundbreaking ML project or a scalable backend system, I'm here to help bring your
                  vision to life.
                </p>

                <div className="flex justify-center items-center">
                  <Link
                    href="https://www.linkedin.com/in/revanth-padala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 border-2 text-sm sm:text-base ${
                      isDarkMode
                        ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/25"
                        : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/25"
                    }`}
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                    Connect on LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="contact-stats grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-4xl mx-auto">
            {[
              {
                number: "24/7",
                label: "Available for exciting projects",
                icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
              },
              { number: "< 24h", label: "Response time", icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { number: "100%", label: "Commitment to quality", icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { number: "∞", label: "Passion for innovation", icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" /> },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm slide-item ${
                  isDarkMode ? "bg-white/5" : "bg-black/5"
                }`}
              >
                <div
                  className={`inline-flex p-2 sm:p-3 rounded-full mb-2 sm:mb-3 ${
                    isDarkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {stat.number}
                </div>
                <div className={`text-xs sm:text-sm ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 sm:py-8 border-t ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center text-sm sm:text-base ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
            <p>&copy; 2024 Revanth Padala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
