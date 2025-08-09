import { Twitter, Github, MessageCircle } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full px-5 py-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-8 mb-12">
          {/* Brand */}
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R2O</span>
              </div>
              <span className="text-foreground text-xl font-bold">Race2Own</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              The revolutionary NFT rent-to-own protocol built on SUI blockchain.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/20 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-left">
          <p className="text-muted-foreground text-sm">© 2025 Race2Own. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
