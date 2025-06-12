import Link from "next/link"
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
export function footerzinho(){
    return(
         /* Footer */
      <footer className="bg-[#f5f5f5] ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="flex items-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <path
                    d="M12 8C12 5.79086 13.7909 4 16 4H24C26.2091 4 28 5.79086 28 8V32C28 34.2091 26.2091 36 24 36H16C13.7909 36 12 34.2091 12 32V8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M12 14H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 26H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
              <div className="flex space-x-4">
                <Link href="#" className="text-black hover:text-gray-600">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-black hover:text-gray-600">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-black hover:text-gray-600">
                  <Youtube size={20} />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link href="#" className="text-black hover:text-gray-600">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h3 className="font-semibold mb-4">Use cases</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      UI design
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      UX design
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Wireframing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Diagramming
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Brainstorming
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Online whiteboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Team collaboration
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Design
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Development features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Design systems
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Collaboration features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Design process
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      FigJam
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Best practices
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Colors
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Color wheel
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Developers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-black hover:text-gray-600">
                      Resource library
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}