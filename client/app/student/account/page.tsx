import { AppSidebar } from "@/components/student/app-sidebar"
import Link from "next/link"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/student/site-header"


export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader/>
        <section>
            <main id="content">
            <div className="p3amf y95gc w-full ehc3u fglch xf1r4 ids43 mx-auto">
              <div className="w-full msxlk mx-auto">
                <h1 className="n8xpr sikx1 mp30q c9jt8 dark:text-neutral-200">Account</h1>
                <div className="w6mr2">
                  {/* Account Details */}
                  <div className="flex items-center g27d7 xh5o9">
                    <img
                      className="e731n hd79j kghwt"
                      src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                      alt="Avatar"
                    />
                    <div className="hlt95">
                      <div className="flex flex-wrap items-center o4ndh">
                        <div className="hlt95 s1lil">
                          <span className="block sikx1 c9jt8 dark:text-neutral-200">
                            James Collins
                          </span>
                          <p className="w4xo0 jy5gh dark:text-neutral-500">
                            jamescollins@site.so
                          </p>
                        </div>
                        <button
                          type="button"
                          className="m6d8q sikx1 w4xo0 c9jt8 l5oyh povjg iiod0 focus:outline-hidden s6w37 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400"
                        >
                          <Link href="/">Logout</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Account Details */}
                </div>
                {/* Grid */}
                <div className="ylm8n hjdn7 fafsg dy3ai g27d7 gbedp">
                  {/* Account Page Preview Card */}
                  <Link
                    className="tbd2k dgycp relative aqyoh flex flex-col er6t7 focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-indigo-600 hover:before:shadow-lg focus:before:border-2 focus:before:border-indigo-600 focus:before:shadow-lg dark:bg-neutral-900 dark:before:border-neutral-700 dark:hover:before:border-indigo-500 dark:focus:before:border-indigo-500"
                    href="/student/account/sc/profile"
                  >
                    <svg
                      className="e731n qqwrg c9jt8 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <h4 className="jl6n6 sikx1 c9jt8 dark:text-neutral-200">
                      Personal Info
                    </h4>
                    <p className="rwavo w4xo0 jy5gh dark:text-neutral-500">
                      Update your details, email preferences or password
                    </p>
                  </Link>
                  {/* End Account Page Preview Card */}
                  {/* Account Page Preview Card */}
                  <Link
                    className="tbd2k dgycp relative aqyoh flex flex-col er6t7 focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-indigo-600 hover:before:shadow-lg focus:before:border-2 focus:before:border-indigo-600 focus:before:shadow-lg dark:bg-neutral-900 dark:before:border-neutral-700 dark:hover:before:border-indigo-500 dark:focus:before:border-indigo-500"
                    href="/student/account/sc/report"
                  >
                    <svg
                      className="e731n qqwrg c9jt8 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <h4 className="jl6n6 sikx1 c9jt8 dark:text-neutral-200">My Report's</h4>
                    <p className="rwavo w4xo0 jy5gh dark:text-neutral-500">
                      Check the status of your learnig or see past reports
                    </p>
                  </Link>
                  {/* End Account Page Preview Card */}
                  {/* Account Page Preview Card */}
                  <a
                    className="tbd2k dgycp relative aqyoh flex flex-col er6t7 focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-indigo-600 hover:before:shadow-lg focus:before:border-2 focus:before:border-indigo-600 focus:before:shadow-lg dark:bg-neutral-900 dark:before:border-neutral-700 dark:hover:before:border-indigo-500 dark:focus:before:border-indigo-500"
                    href="/student/account/sc/achivements"
                  >
                    <svg
                      className="e731n qqwrg c9jt8 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                      <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                      <path d="M18 22v-3" />
                      <circle cx={10} cy={10} r={3} />
                    </svg>
                    <h4 className="jl6n6 sikx1 c9jt8 dark:text-neutral-200">Achivement</h4>
                    <p className="rwavo w4xo0 jy5gh dark:text-neutral-500">
                      Manage your billing &amp; shipping addresses
                    </p>
                  </a>
                  {/* End Account Page Preview Card */}
                  {/* Account Page Preview Card */}
                  <a
                    className="tbd2k dgycp relative aqyoh flex flex-col er6t7 focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-indigo-600 hover:before:shadow-lg focus:before:border-2 focus:before:border-indigo-600 focus:before:shadow-lg dark:bg-neutral-900 dark:before:border-neutral-700 dark:hover:before:border-indigo-500 dark:focus:before:border-indigo-500"
                    href="/student/account/sc/payment"
                  >
                    <svg
                      className="e731n qqwrg c9jt8 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width={20} height={14} x={2} y={5} rx={2} />
                      <line x1={2} x2={22} y1={10} y2={10} />
                    </svg>
                    <h4 className="jl6n6 sikx1 c9jt8 dark:text-neutral-200">Payment</h4>
                    <p className="rwavo w4xo0 jy5gh dark:text-neutral-500">
                      Manage credit cards
                    </p>
                    <span className="absolute jeoi3 tb54y gxxgf">
                      <span className="a3ame eoh5b c049u inline-flex jkwm1 items-center n6i5x xs2f2 kghwt rsdjd rewn3 zgkz2 wz4sg dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-500">
                        <span className="cwhsv">Attention needed</span>
                      </span>
                    </span>
                  </a>
                  {/* End Account Page Preview Card */}
                  {/* Account Page Preview Card */}
                  <a
                    className="tbd2k dgycp relative aqyoh flex flex-col er6t7 focus:outline-hidden before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-indigo-600 hover:before:shadow-lg focus:before:border-2 focus:before:border-indigo-600 focus:before:shadow-lg dark:bg-neutral-900 dark:before:border-neutral-700 dark:hover:before:border-indigo-500 dark:focus:before:border-indigo-500"
                    href="/student/account/sc/giftcard"
                  >
                    <svg
                      className="e731n qqwrg c9jt8 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x={3} y={8} width={18} height={4} rx={1} />
                      <path d="M12 8v13" />
                      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                    </svg>
                    <h4 className="jl6n6 sikx1 c9jt8 dark:text-neutral-200">
                      Gift Cards
                    </h4>
                    <p className="rwavo w4xo0 jy5gh dark:text-neutral-500">
                      View balance or redeem a card, and purchase a new Gift Card
                    </p>
                  </a>
                   </div>
                {/* End Grid */}
                <div className="ah7xl">
                  {/* Contact Info */}
                  <div>
                    <h2 className="wyf4w w4xo0 sikx1 c9jt8 dark:text-neutral-200">
                      Need assistance?
                    </h2>
                    <div className="ylm8n hjdn7 fafsg items-center o4ndh">
                      <div>
                        <p className="w4xo0 jy5gh dark:text-neutral-500">
                          Ask our customer service
                        </p>
                        <p className="w4xo0 jy5gh dark:text-neutral-500">
                          Mon to Sun, 5 am to 8 pm PT
                        </p>
                      </div>
                      <div className="dggc0">
                        <a
                          className="inline-flex jkwm1 items-center n6i5x sikx1 w4xo0 c9jt8 l5oyh povjg iiod0 focus:outline-hidden s6w37 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400"
                          href="../../pro/shop/help.html"
                        >
                          Contact us
                          <svg
                            className="e731n b9gop"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Contact Info */}
                </div>
              </div>
            </div>
          </main>
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
