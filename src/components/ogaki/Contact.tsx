"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "./ScrollReveal"
import Link from "next/link"

/**
 * Section CTA + Contact — formulaire Netlify fonctionnel
 */
export function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "clamp(4rem, 15vh, 12rem) var(--ogaki-gutter)" }}
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <p
            className="text-[#C5A059] font-sans uppercase mb-4 text-center"
            style={{
              fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
              letterSpacing: "0.35em",
            }}
          >
            Contact
          </p>
          <h2
            className="font-display text-white text-center mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Envie de donner vie à votre projet ?
          </h2>
          <p
            className="text-white/35 font-sans text-center mb-16 max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            Je serais ravie de collaborer avec vous pour créer quelque chose
            d&apos;exceptionnel qui marquera les esprits et atteindra vos objectifs.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
            <Link
              href="/contact"
              className="text-[#C5A059] border border-[#C5A059]/30 hover:border-[#C5A059]/70 font-sans uppercase transition-all duration-500 hover:bg-[#C5A059]/5"
              style={{
                fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
                letterSpacing: "0.2em",
                padding:
                  "clamp(0.875rem, 1.3vw, 1.1rem) clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              Démarrons un projet
            </Link>
            <Link
              href="/a-propos"
              className="text-white/40 hover:text-white/70 font-sans uppercase transition-colors duration-400"
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
                letterSpacing: "0.2em",
              }}
            >
              En savoir plus sur moi
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-6 mb-16">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span
              className="text-white/15 font-sans uppercase"
              style={{
                fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
                letterSpacing: "0.3em",
              }}
            >
              ou contactez-moi directement
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <form
            name="contact-home"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-14"
          >
            <input type="hidden" name="form-name" value="contact-home" />
            <p className="hidden">
              <label>Ne pas remplir: <input name="bot-field" /></label>
            </p>

            <div className="group">
              <label htmlFor="ogaki-name" className="sr-only">
                Votre nom
              </label>
              <input
                id="ogaki-name"
                name="name"
                type="text"
                placeholder="Votre nom"
                required
                className="ogaki-input"
                autoComplete="name"
              />
            </div>

            <div className="group">
              <label htmlFor="ogaki-email" className="sr-only">
                Votre email
              </label>
              <input
                id="ogaki-email"
                name="email"
                type="email"
                placeholder="Votre email"
                required
                className="ogaki-input"
                autoComplete="email"
              />
            </div>

            <div className="group">
              <label htmlFor="ogaki-message" className="sr-only">
                Votre message
              </label>
              <textarea
                id="ogaki-message"
                name="message"
                placeholder="Votre message"
                rows={3}
                required
                className="ogaki-input resize-none"
              />
            </div>

            <div className="text-center pt-8">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-[#C5A059] border border-[#C5A059]/25 hover:border-[#C5A059]/60 font-sans uppercase transition-colors duration-500"
                style={{
                  fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
                  letterSpacing: "0.25em",
                  padding:
                    "clamp(0.875rem, 1.5vw, 1.25rem) clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                Envoyer
              </motion.button>
            </div>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-28 pt-10 border-t border-white/[0.06] text-center">
            <p
              className="text-white/25 font-sans"
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
                letterSpacing: "0.2em",
              }}
            >
              © {new Date().getFullYear()} Charlotte Crescence — Tous droits réservés
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
