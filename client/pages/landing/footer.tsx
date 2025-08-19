import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
<footer className="mt-auto aqyoh dark:bg-neutral-900">
  <div className="w-full er0d1 mx-auto beg37 s64f7 fglch xf1r4 ids43">
    {/* Grid */}
    <div className="ylm8n dzapa z0knj n60o7 e3s31 ust79">
      <div className="qhvks hdcfi h1r77 flex flex-row md:flex-col ox2cl n60o7">
        <div>
          {/* Logo */}
          <a
            className="flex-none m74u5 mp30q inline-block cnneu focus:outline-hidden o8t9n"
            href="../../pro/startup/index.html"
            aria-label="Preline"
          >
            <svg
              className="npnqn h-auto"
              width={116}
              height={32}
              viewBox="0 0 116 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z"
                className="lo99w dark:fill-white"
                fill="currentColor"
              />
              <path
                d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12"
                className="d2020 dark:stroke-white"
                stroke="currentColor"
                strokeWidth={2}
              />
              <path
                d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12"
                className="d2020 dark:stroke-white"
                stroke="currentColor"
                strokeWidth={2}
              />
              <circle
                cx={13}
                cy="16.5214"
                r={5}
                className="lo99w dark:fill-white"
                fill="currentColor"
              />
            </svg>
          </a>
          {/* End Logo */}
        </div>
        <div>
          {/* Social Brands */}
          <div className="-mx-2.5 flex flex-wrap items-center v1hon">
            <a
              className="flex flex-col jkwm1 items-center qqwrg q6c2r kghwt w4xo0 jy5gh d05xb disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden r17tr dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              href="#"
            >
              <svg
                className="e731n h6zia"
                width={48}
                height={50}
                viewBox="0 0 48 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.5665 20.7714L46.4356 0H42.2012L26.6855 18.0355L14.2931 0H0L18.7397 27.2728L0 49.0548H4.23464L20.6196 30.0087L33.7069 49.0548H48L28.5655 20.7714H28.5665ZM22.7666 27.5131L5.76044 3.18778H12.2646L42.2032 46.012H35.699L22.7666 27.5142V27.5131Z"
                  fill="currentColor"
                />
              </svg>
              <span className="et50x">X (Twitter)</span>
            </a>
            <a
              className="flex flex-col jkwm1 items-center qqwrg q6c2r kghwt w4xo0 jy5gh d05xb disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden r17tr dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              href="#"
            >
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
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="et50x">Instagram</span>
            </a>
          </div>
          {/* End Social Brands */}
        </div>
      </div>
      {/* End Col */}
      <div>
        <h4 className="rwumq ik3rb sikx1 w4xo0 c9jt8 dark:text-neutral-200">
          Company
        </h4>
        <ul className="ylm8n md:space-y-2">
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Newsroom
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              New features
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Careers
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Investors
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Purpose
            </a>
          </li>
        </ul>
      </div>
      {/* End Col */}
      <div>
        <h4 className="rwumq ik3rb sikx1 w4xo0 c9jt8 dark:text-neutral-200">
          Resources
        </h4>
        <ul className="ylm8n md:space-y-2">
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Gift Cards
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Find a Store
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Membership
            </a>
          </li>
        </ul>
      </div>
      {/* End Col */}
      <div>
        <h4 className="rwumq ik3rb sikx1 w4xo0 c9jt8 dark:text-neutral-200">
          Help
        </h4>
        <ul className="ylm8n md:space-y-2">
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Help Center
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              FAQs
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Subscription
            </a>
          </li>
          <li>
            <a
              className="z4zqw sqycf jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              href="#"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      {/* End Col */}
      <div className="space-y-10">
        <div>
          <h4 className="sikx1 w4xo0 c9jt8 dark:text-neutral-200">Apps</h4>
          {/* Social Brands */}
          <div className="ja90s -mx-3 flex flex-col v1hon">
            <div>
              <a
                className="inline-flex items-center n9hej od5va sfv8v kghwt z4zqw sqycf c9jt8 d05xb disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden r17tr dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                <svg
                  className="e731n b9gop v26s6 dark:text-white"
                  width={75}
                  height={86}
                  viewBox="0 0 75 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.6565 20.8071C41.4061 20.8071 45.5728 18.9524 49.1564 15.2429C52.7399 11.5334 54.5318 7.21993 54.5318 2.30245C54.5318 1.76237 54.4891 0.994884 54.4038 0C53.7781 0.0852758 53.3088 0.156339 52.9959 0.213189C48.616 0.838545 44.7622 2.98465 41.4345 6.65142C38.107 10.3183 36.4432 14.241 36.4432 18.4195C36.4432 18.9026 36.5143 19.6986 36.6565 20.8071ZM53.6785 86C57.063 86 60.803 83.6834 64.8986 79.0501C68.9942 74.4168 72.1226 68.9734 74.2842 62.7199C66.2353 58.5698 62.2109 52.6148 62.2109 44.8547C62.2109 38.3738 65.4674 32.831 71.9805 28.2261C67.4583 22.5695 61.4857 19.7412 54.0625 19.7412C50.9339 19.7412 48.0756 20.2102 45.4875 21.1482L43.8664 21.7451L41.6906 22.5979C40.2685 23.138 38.9744 23.4081 37.8083 23.4081C36.8982 23.4081 35.7036 23.0953 34.2248 22.47L32.5609 21.7878L30.9825 21.1482C28.6787 20.1818 26.2043 19.6985 23.5593 19.6985C16.4774 19.6985 10.7892 22.0862 6.49456 26.8617C2.1999 31.637 0.0526123 37.9332 0.0526123 45.7501C0.0526123 56.7506 3.49397 66.9126 10.3768 76.236C15.1549 82.7453 19.5207 86 23.4739 86C25.152 86 26.8158 85.6731 28.4654 85.0193L30.5558 84.1666L32.2197 83.5696C34.5518 82.7453 36.6991 82.3331 38.6615 82.3331C40.7378 82.3331 43.1268 82.8591 45.8288 83.9107L47.1513 84.4224C49.91 85.4741 52.0859 86 53.6785 86Z"
                    fill="currentColor"
                  />
                </svg>
                MacOS
              </a>
            </div>
            <div>
              <a
                className="inline-flex items-center n9hej od5va sfv8v kghwt z4zqw sqycf c9jt8 d05xb disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden r17tr dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                <svg
                  className="e731n b9gop"
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.536 0H6.464C2.892 0 0 2.892 0 6.464V25.54C0 29.108 2.892 32 6.464 32H25.54C29.108 32 32.004 29.108 32.004 25.536V6.464C32 2.892 29.108 0 25.536 0Z"
                    fill="url(#paint0_linear_4403_2024footer)"
                  />
                  <path
                    d="M15.864 7.352L16.512 6.232C16.912 5.532 17.804 5.296 18.504 5.696C19.204 6.096 19.44 6.988 19.04 7.688L12.796 18.496H17.312C18.776 18.496 19.596 20.216 18.96 21.408H5.72C4.912 21.408 4.264 20.76 4.264 19.952C4.264 19.144 4.912 18.496 5.72 18.496H9.432L14.184 10.26L12.7 7.684C12.3 6.984 12.536 6.1 13.236 5.692C13.936 5.292 14.82 5.528 15.228 6.228L15.864 7.352ZM10.248 22.908L8.848 25.336C8.448 26.036 7.556 26.272 6.856 25.872C6.156 25.472 5.92 24.58 6.32 23.88L7.36 22.08C8.536 21.716 9.492 21.996 10.248 22.908ZM22.304 18.504H26.092C26.9 18.504 27.548 19.152 27.548 19.96C27.548 20.768 26.9 21.416 26.092 21.416H23.988L25.408 23.88C25.808 24.58 25.572 25.464 24.872 25.872C24.172 26.272 23.288 26.036 22.88 25.336C20.488 21.188 18.692 18.084 17.5 16.016C16.28 13.912 17.152 11.8 18.012 11.084C18.968 12.724 20.396 15.2 22.304 18.504Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4403_2024footer"
                      x1="16.002"
                      y1={0}
                      x2="16.002"
                      y2={32}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#18BFFB" />
                      <stop offset={1} stopColor="#2072F3" />
                    </linearGradient>
                  </defs>
                </svg>
                App Store
              </a>
            </div>
            <div>
              <a
                className="inline-flex items-center n9hej od5va sfv8v kghwt z4zqw sqycf c9jt8 d05xb disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden r17tr dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                <svg
                  className="e731n b9gop"
                  width={32}
                  height={37}
                  viewBox="0 0 32 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5159 11.1765L1.20745 0.140891C0.964824 1.05128e-05 0.659583 0.00783721 0.424782 0.148718C0.182154 0.289598 0.0334473 0.540052 0.0334473 0.821813C0.0334473 0.821813 0.041274 1.83928 0.0491007 3.5142L14.1137 17.5788L20.5159 11.1765Z"
                    fill="url(#paint0_linear_4406_2034footer)"
                  />
                  <path
                    d="M0.0491007 3.5142C0.0725807 9.5564 0.143021 24.2236 0.174328 31.5259L14.1215 17.5788L0.0491007 3.5142Z"
                    fill="url(#paint1_linear_4406_2034footer)"
                  />
                  <path
                    d="M31.5672 17.4927L20.5159 11.1765L14.1058 17.5788L21.3377 24.8106L31.575 18.8467C31.8177 18.7058 31.9664 18.4475 31.9664 18.1736C31.9664 17.8918 31.8098 17.6336 31.5672 17.4927Z"
                    fill="url(#paint2_linear_4406_2034footer)"
                  />
                  <path
                    d="M0.166501 31.5259C0.182154 34.1322 0.189981 35.7993 0.189981 35.7993C0.189981 36.0811 0.338688 36.3394 0.581316 36.4724C0.823943 36.6133 1.12136 36.6133 1.36399 36.4724L21.3455 24.8185L14.1137 17.5866L0.166501 31.5259Z"
                    fill="url(#paint3_linear_4406_2034footer)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4406_2034footer"
                      x1="0.0334473"
                      y1="18.3158"
                      x2="31.972"
                      y2="18.3158"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#63BE6B" />
                      <stop offset="0.506" stopColor="#5BBC6A" />
                      <stop offset={1} stopColor="#4AB96A" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_4406_2034footer"
                      x1="0.0249224"
                      y1="18.313"
                      x2="31.9479"
                      y2="18.313"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3EC6F2" />
                      <stop offset={1} stopColor="#45AFE3" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_4406_2034footer"
                      x1="0.0468809"
                      y1="18.322"
                      x2="31.963"
                      y2="18.322"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FAA51A" />
                      <stop offset="0.387" stopColor="#FAB716" />
                      <stop offset="0.741" stopColor="#FAC412" />
                      <stop offset={1} stopColor="#FAC80F" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_4406_2034footer"
                      x1="0.169948"
                      y1="27.082"
                      x2="21.3452"
                      y2="27.082"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#EC3B50" />
                      <stop offset={1} stopColor="#E7515B" />
                    </linearGradient>
                  </defs>
                </svg>
                Google Play
              </a>
            </div>
          </div>
          {/* End Social Brands */}
        </div>
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  <div className="w-full er0d1 bdgsd jqiho mx-auto fglch xf1r4 ids43">
    <div className="flex flex-wrap ox2cl items-center g27d7">
      {/* List */}
      <ul className="flex flex-wrap items-center s1lil g27d7">
        <li className="inline-flex items-center relative xs2f2 jy5gh ssqu0 x3yuu last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a
            className="xs2f2 jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
            href="#"
          >
            Terms and Conditions
          </a>
        </li>
        <li className="inline-flex items-center relative xs2f2 jy5gh ssqu0 x3yuu last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a
            className="xs2f2 jy5gh mg8vb focus:outline-hidden pwmu5 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
            href="#"
          >
            Privacy &amp; Policy
          </a>
        </li>
      </ul>
      {/* End List */}
      <p className="xs2f2 jy5gh dark:text-neutral-500">© 2025 E-Lab.</p>
    </div>
  </div>
</footer>
  );
}
       