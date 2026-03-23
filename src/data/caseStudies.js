// Case Studies Database - Parsed from Success Case Studies PDF
// Used for "Customers Like You" matching and social proof

export const caseStudies = [
  // ============== ENTERPRISE CASE STUDIES ==============

  {
    id: 'felleskjopet',
    company: 'Felleskjøpet Agri SA',
    industry: 'agriculture',
    size: 'enterprise',
    location: 'emea',
    employeeCount: 890,
    sourcePlatform: 'citrix',
    headline: 'Felleskjøpet Agri SA leaves legacy VDI behind and harvests nearly 4M NOK',
    situation: 'Felleskjøpet Agri SA, a leading agricultural cooperative in Norway, was struggling with the rising costs and complexity of its Citrix environment. Locked into a platinum license covering 2,400 users—when only ~1,300 were needed—the organization was overspending while a single administrator managed an increasingly complex infrastructure.',
    solution: 'Felleskjøpet began with a proof of concept to validate critical apps—including a 50-year-old COBOL ERP—before completing full deployment in just 3-4 months. By reusing existing tools and leveraging Nerdio\'s automation and GUI, the transition was seamless, supported by Devoteam, Microsoft funding, and 100 hours of consulting.',
    impacts: [
      { metric: 'Cost Savings', value: '~9M NOK', detail: 'saved over three years in licensing, plus additional compute cost reductions via Auto-Scaling' },
      { metric: 'Admin Efficiency', value: 'Simplified', detail: 'One administrator can manage the entire environment with simplified deployment and automation' },
      { metric: 'Performance', value: 'Improved', detail: 'by moving from server-based OS to Windows 11' }
    ],
    quote: "Nerdio lets us scale without increasing headcount—it's efficiency and growth built in.",
    quotePerson: 'Matthew Nikravesh',
    quoteTitle: 'CEO of Solarus Technologies',
    tags: ['citrix-migration', 'cost-optimization', 'agriculture', 'emea']
  },

  {
    id: 'carvana',
    company: 'Carvana',
    industry: 'retail',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'legacy-vdi',
    headline: 'Carvana cuts IT costs in half with a 14-day Nerdio migration',
    situation: 'Carvana, a major retail company in North America with thousands of employees, faced rising costs and operational complexity in its virtual desktop environment. Their previous VDI platform lacked usability, flexibility, and modern optimization features—while expiring contracts left them with only a narrow window to migrate without disruption.',
    solution: 'After evaluating multiple providers, Carvana selected Nerdio Manager for Enterprise for its automation, intuitive management, and built-in optimization. Following a successful proof of concept, the team—working closely with Nerdio—completed migration of thousands of users in just 14 days. Nerdio\'s platform simplified administration for both senior engineers and junior staff while unlocking built-in Auto-Scaling.',
    impacts: [
      { metric: 'Cost Savings', value: '40-50%', detail: 'IT cost savings through auto-scaling' },
      { metric: 'Efficiency', value: '20%', detail: 'increase in efficiency from automation and reporting tools' },
      { metric: 'Team Capacity', value: 'Stronger', detail: 'team capacity, with junior admins empowered and senior engineers freed for higher-value work' }
    ],
    quote: "We had tried to engineer our own auto-scaling solution in the past without success. Nerdio had it built in. That made a huge difference for us.",
    quotePerson: 'Brandon Holliday',
    quoteTitle: 'Cloud Support Team Lead, Carvana',
    tags: ['rapid-migration', 'auto-scaling', 'cost-optimization', 'retail']
  },

  {
    id: 'priority-worldwide',
    company: 'Priority Worldwide',
    industry: 'logistics',
    size: 'enterprise',
    location: 'global',
    employeeCount: null,
    sourcePlatform: 'msp-managed',
    headline: 'Priority Worldwide achieves six-figure savings with Nerdio',
    situation: 'Priority Worldwide, a global logistics provider, struggled with managing its Azure environment after parting ways with an MSP. Lacking in-house cloud engineering expertise, the team faced complex management challenges using native Azure tools.',
    solution: 'The company adopted Nerdio Manager for Enterprise, gaining an easy-to-use solution for efficient Azure management. Nerdio Manager\'s automation, monitoring, and cost-saving features empowered the team to take full control without hiring a dedicated cloud engineer.',
    impacts: [
      { metric: 'Cost Savings', value: '$20,000', detail: 'monthly on compute costs' },
      { metric: 'Visibility', value: 'Real-time', detail: 'insights with intelligent dashboards' },
      { metric: 'Team Efficiency', value: 'Enhanced', detail: 'without additional headcount' }
    ],
    quote: "Nerdio's automation ensures we don't lose critical knowledge when team members leave—it's a game-changer for continuity.",
    quotePerson: 'Michael Williams',
    quoteTitle: 'CIO, Priority Worldwide',
    tags: ['logistics', 'cost-optimization', 'automation', 'global']
  },

  {
    id: 'nuneaton-bedworth',
    company: 'Nuneaton & Bedworth Borough Council',
    industry: 'government',
    size: 'enterprise',
    location: 'emea',
    employeeCount: 130000,
    sourcePlatform: 'manual-avd',
    headline: 'Nerdio empowers Nuneaton & Bedworth Borough Council to maximize IT efficiency and fiscal responsibility',
    situation: 'Nuneaton & Bedworth Borough Council, serving 130,000 residents, struggled with time-consuming manual processes for managing its AVD environment. Weekly image updates consumed significant IT resources and increased the risk of errors, limiting the team\'s ability to focus on strategic initiatives.',
    solution: 'The council implemented Nerdio Manager for Enterprise to automate time-intensive tasks, enable dynamic server scaling, and streamline storage management. With built-in scripts and intelligent automation, the solution transformed the council\'s IT operations, reducing both time and cost burdens.',
    impacts: [
      { metric: 'Cost Savings', value: '£2,000', detail: 'monthly on virtual infrastructure' },
      { metric: 'Reliability', value: 'Faster troubleshooting', detail: 'Ensured reliability through faster troubleshooting and agile scaling' },
      { metric: 'Automation', value: 'Weekly', detail: 'Automated weekly image updates, saving hours' }
    ],
    quote: "If we got rid of Nerdio, it would cost us more to do the same thing that we're doing now! It's not just about cost cutting—it's about smart, efficient operations that allow us to reinvest in our growth and public services.",
    quotePerson: 'Richard Billings',
    quoteTitle: 'Infrastructure Support Officer, Nuneaton & Bedworth Borough Council',
    tags: ['government', 'public-sector', 'automation', 'image-management', 'emea']
  },

  {
    id: 'sage',
    company: 'Sage',
    industry: 'financial-services',
    size: 'enterprise',
    location: 'global',
    employeeCount: null,
    sourcePlatform: 'citrix',
    headline: 'Sage saves more than one million dollars annually with Nerdio',
    situation: 'Sage was unable to scale within its existing Citrix hosting platform due to manual workload and burdensome platform management, high costs, and inefficiencies in managing virtual machines.',
    solution: 'Implementing Nerdio + AVD, Sage was able to enhance automation, automate scaling, and easily maintain VMs.',
    impacts: [
      { metric: 'Cost Savings', value: '62-65%', detail: 'Reduced virtual machine direct costs by 62-65%' },
      { metric: 'Headcount Avoided', value: '20 FTEs', detail: 'Avoided the cost of adding over 20 full-time employees' },
      { metric: 'Annual Savings', value: '$1.5M+', detail: 'Saved approximately $1.5 million annually' }
    ],
    quote: "It's like having another engineer doing some work for me every morning—an IT engineer switching all my virtual machines, switching them on and off, making sure that they're running, them on and off, making sure they're present. If anything fails or breaks, it automatically rebuilds and just brings that back in.",
    quotePerson: 'Kevin Thompson',
    quoteTitle: 'Senior Cloud Operations Manager',
    tags: ['citrix-migration', 'cost-optimization', 'financial-services', 'auto-scaling']
  },

  {
    id: 'anonymous-finserv-1',
    company: 'Multi-national Financial Services',
    industry: 'financial-services',
    size: 'enterprise',
    location: 'global',
    employeeCount: 15000,
    sourcePlatform: 'citrix',
    headline: 'Nerdio automation helps healthcare company do more with less',
    situation: 'With a small team and limited bandwidth, this multi-national financial services company struggled to move from Citrix to Microsoft Azure Virtual Desktop (AVD), finding the native platform laborious and difficult to scale.',
    solution: 'Following a merger/acquisition, the company was able to easily migrate 15,000 users to AVD and Nerdio and manage AVD for the company\'s 20,000 users with only a small team.',
    impacts: [
      { metric: 'Deployment', value: '30-40%', detail: 'Saved 30-40% per user with image deployment automation' },
      { metric: 'FTE Savings', value: '20%', detail: 'Saved 20% on FTE costs with automation and scaling' },
      { metric: 'Overall Savings', value: '55%', detail: 'Achieved overall savings from auto-scaling of 55%' }
    ],
    quote: "With Nerdio, if we saw that something could be better with this or that modification, within two weeks, they were turning those ideas back into the application for us to try out. They were turning them around so rapidly that we knew that they were going to be responsive to us, and that remains the case to this day.",
    quotePerson: 'Senior Engineer',
    quoteTitle: 'App and Desktop Virtualization',
    tags: ['citrix-migration', 'merger-acquisition', 'financial-services', 'automation']
  },

  {
    id: 'denholm-group',
    company: 'The Denholm Group',
    industry: 'shipping-logistics',
    size: 'enterprise',
    location: 'global',
    employeeCount: null,
    sourcePlatform: 'on-premises',
    headline: 'The Denholm group\'s journey with Nerdio and Microsoft Azure Virtual Desktop',
    situation: 'Denholm faced a significant challenge in managing its IT infrastructure, particularly its remote desktop infrastructure, encountering numerous complexities and inefficiencies with its existing setup.',
    solution: 'Denholm chose to align its cloud strategy with Azure. Nerdio offered a comprehensive solution that met all their requirements and streamlined the AVD management process.',
    impacts: [
      { metric: 'Cost Savings', value: '$900/£700', detail: 'Saved nearly $900 (£700) per month' },
      { metric: 'Dashboards', value: 'Intuitive', detail: 'Accurately assessed resources needs with intuitive dashboards' },
      { metric: 'Disaster Recovery', value: 'Significant', detail: 'Achieved significant disaster recovery improvements' }
    ],
    quote: "It's hard to even remember pain points that just aren't there anymore thanks to Nerdio. But ultimately the benefit for Denholm lies in how the technology improves efficiencies across the board.",
    quotePerson: 'Lloyd Williams',
    quoteTitle: 'Denholm Group Senior Azure Engineer',
    tags: ['shipping', 'logistics', 'azure-migration', 'disaster-recovery']
  },

  {
    id: 'desnz',
    company: 'Department for Energy Security & Net Zero',
    industry: 'government',
    size: 'enterprise',
    location: 'emea',
    employeeCount: 1000,
    sourcePlatform: 'manual-avd',
    headline: 'Nerdio powers government agency\'s data-driven approach to energy security',
    situation: 'The Department for Energy Security and Net Zero (DESNZ) needed a reliable, secure, and automated platform to manage its infrastructure efficiently, as its small team struggled with the manual effort required to support 1,000 users.',
    solution: 'DESNZ easily installed Nerdio Manager from the Azure Marketplace. After the rollout, the amount of time the engineers were able to save enabled them to focus on the estate and project work vital to the department\'s mission.',
    impacts: [
      { metric: 'Cost Reduction', value: '80%', detail: 'Reduced AVD costs by 80%' },
      { metric: 'Automation', value: 'Repetitive tasks', detail: 'Automated repetitive tasks to save time and resources' },
      { metric: 'Reporting', value: 'Data-centric', detail: 'Gained the extensive reporting to be a data-centric agency' }
    ],
    quote: "Nerdio Manager for Enterprise is a well-thought-out product and an invaluable asset for small teams. As more features are unveiled in the future, we plan to continue exploring new ways to get the most out of the platform with our incredible Nerdio team.",
    quotePerson: 'Emilie MacMullen',
    quoteTitle: 'DESNZ Product and Infrastructure Manager',
    tags: ['government', 'energy', 'cost-optimization', 'automation', 'emea']
  },

  {
    id: 'unf',
    company: 'University of North Florida',
    industry: 'education',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: 17000,
    sourcePlatform: 'on-premises',
    headline: 'Nerdio makes the dean\'s list: Powering University of North Florida\'s digital transformation',
    situation: 'In 2021, the University of North Florida (UNF) began a cloud migration to address gaps in its on-premises environment and better serve its 17,000 students.',
    solution: 'Nerdio enabled the University of North Florida to streamline its cloud migration, enhancing scalability, automation, and operational efficiency while freeing up IT resources for strategic initiatives.',
    impacts: [
      { metric: 'Cost Savings', value: '56%', detail: 'Saved 56% per month on Azure costs' },
      { metric: 'Visibility', value: 'Increased', detail: 'Increased visibility into usage patterns for customizable management' },
      { metric: 'Admin Work', value: 'Automated', detail: 'Automated unnecessary admin work' }
    ],
    quote: "Nerdio provided us with peace of mind—it's almost like a safety blanket. Unlike with our previous virtualization solution, I no longer have to sit around to see if machines are being over-utilized. I don't need to move users around or re-image my hosts in the middle of the day. Nerdio handles it all gracefully, ensuring a seamless user experience.",
    quotePerson: 'Michael Holmes',
    quoteTitle: 'Assistant Director of Endpoint Management',
    tags: ['education', 'higher-ed', 'cloud-migration', 'automation']
  },

  {
    id: 'equitable-bank',
    company: 'Equitable Bank',
    industry: 'financial-services',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: 1900,
    sourcePlatform: 'on-premises',
    headline: 'Canada\'s Equitable Bank leverages Nerdio for its digital transformation journey',
    situation: 'Equitable Bank shifted to a work from home structure during the COVID-19 pandemic and required a refresh of its existing VPN hardware to better meet new capacity demands.',
    solution: 'Following the full deployment, Equitable Bank now has a scalable, automated platform that seamlessly connects employees across Canada with a cloud-based solution.',
    impacts: [
      { metric: 'Cost Savings', value: '74%', detail: 'Saved 74% on monthly compute compared to VPN' },
      { metric: 'User Management', value: '1,900', detail: 'Managed 1,900 end users' },
      { metric: 'Connectivity', value: 'Seamless', detail: 'Easily connected users across Canada' }
    ],
    quote: "Today, we are able to accelerate our IT initiatives, reduce complexity, optimize costs, strengthen security, and support remote work. Our technology infrastructure now better aligns with our business goals as we continue to grow and improve our employee experience.",
    quotePerson: 'Vince Palmacci',
    quoteTitle: 'Equitable Bank IT Architect',
    tags: ['financial-services', 'banking', 'covid-response', 'remote-work', 'canada']
  },

  {
    id: 'ucb-pharma',
    company: 'UCB Pharma',
    industry: 'healthcare',
    size: 'enterprise',
    location: 'global',
    employeeCount: 9000,
    sourcePlatform: 'on-premises',
    headline: 'How UCB Pharma found the perfect dose of efficiency with Azure Virtual Desktop and Nerdio',
    situation: 'The UCB Pharma team, responsible for managing 13,000 endpoints across 9,000 workers, needed a secure, scalable solution to support its global workforce while managing complex IT infrastructure and ensuring compliance in a highly regulated industry.',
    solution: 'By leveraging Azure Virtual Desktop and Nerdio, UCB Pharma streamlined IT management, enhanced security, and enabled seamless scalability, allowing the company to focus on core operations while meeting compliance requirements.',
    impacts: [
      { metric: 'Cost Savings', value: '80%', detail: 'Saved 80% on overall costs' },
      { metric: 'Carbon Footprint', value: 'Reduced', detail: 'Reduced carbon footprint by dynamically adjusting resources' },
      { metric: 'Admin Work', value: 'Eliminated', detail: 'Eliminated tedious administrative work' }
    ],
    quote: "We were wasting so much on services that no one was using. Now, with the shared office VDI being used by over 1,000 users, Nerdio has become more indispensable than ever in optimizing our resources.",
    quotePerson: 'Ralph Schepke',
    quoteTitle: 'UCB Pharma Head of Digital Workplace Services',
    tags: ['healthcare', 'pharma', 'compliance', 'global', 'cost-optimization']
  },

  {
    id: 'make-a-wish-uk',
    company: 'Make-A-Wish UK',
    industry: 'nonprofit',
    size: 'midsize',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'fragmented',
    headline: 'Turning wishes into reality: Make-A-Wish UK\'s digital transformation with Nerdio',
    situation: 'Make-A-Wish UK struggled with managing a fragmented, manual IT environment that lacked scalability and flexibility, hindering its ability to efficiently support staff and volunteers working across various locations.',
    solution: 'Nerdio provided Make-A-Wish UK with an automated, scalable platform, simplifying IT management, reducing costs, and enabling the charity to focus more on its core mission of granting life-changing wishes.',
    impacts: [
      { metric: 'Cost Reduction', value: '40%', detail: 'Reduced Azure bill by 40% each month' },
      { metric: 'User Experience', value: 'Positive', detail: 'Led to a positive end-user experience' },
      { metric: 'Focus', value: 'Mission', detail: 'Allowed team to refocus efforts on granting wishes' }
    ],
    quote: "As a not-for-profit, we're always looking for ways to do more with less. The less we spend on IT infrastructure, hardware, and software, the more we can put towards granting the wishes of the over 60,000 children in the UK diagnosed with a critical condition. Nerdio Manager for Enterprise is an irreplaceable tool in our stack that consistently pays for itself and saves us money across the organization.",
    quotePerson: 'Oliver Wilson',
    quoteTitle: 'Make-A-Wish UK Technology & Workplace Lead',
    tags: ['nonprofit', 'charity', 'cost-optimization', 'emea']
  },

  {
    id: 'vanquis-bank',
    company: 'Vanquis Bank',
    industry: 'financial-services',
    size: 'enterprise',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'legacy-infrastructure',
    headline: 'Banking on remote success: Vanquis transforms customer service with Nerdio and Azure Virtual Desktop',
    situation: 'Using an inefficient legacy infrastructure that generated poor employee complaints regarding poor user experiences, Vanquis Bank needed a virtual desktop solution that would provide secure, reliable access from anywhere.',
    solution: 'By implementing Nerdio with Azure Virtual Desktop, Vanquis Bank enabled secure, scalable remote access for its customer service teams, enhancing efficiency and maintaining compliance with industry standards.',
    impacts: [
      { metric: 'Efficiency', value: 'Improved', detail: 'Improved efficiency and performance of Azure Virtual Desktop' },
      { metric: 'Security', value: 'Sophisticated', detail: 'Put sophisticated security protocols in place' },
      { metric: 'Cost Savings', value: '$64,000/mo', detail: 'Saved $64,000 monthly (a 52% decrease)' }
    ],
    quote: "Now that we've been able to migrate away from our previous vendor and are experiencing the savings across Azure through Nerdio Manager for Enterprise, our stakeholders are going to be very happy. On top of that, the feedback from our end users has been glowing.",
    quotePerson: 'Vikki Palmer',
    quoteTitle: 'Vanquis Bank Client Engineering Lead',
    tags: ['financial-services', 'banking', 'remote-work', 'security', 'emea']
  },

  {
    id: 'karbon-homes',
    company: 'Karbon Homes',
    industry: 'nonprofit',
    size: 'enterprise',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'on-premises-vdi',
    headline: 'Karbon Homes reduces Azure Virtual Desktop costs by more than 60% with Nerdio',
    situation: 'To ensure better service for its customers and improve user experience for employees, Karbon Homes made the decision to migrate away from its on-premises VDI infrastructure in favor of Azure Virtual Desktop (AVD).',
    solution: 'By using Nerdio\'s automation and scaling capabilities, Karbon Homes optimized its infrastructure and significantly lowered AVD management expenses.',
    impacts: [
      { metric: 'Cost Savings', value: '60%+', detail: 'Saved more than 60% on overall Azure Virtual Desktop costs, totaling nearly £10,000/month' },
      { metric: 'Environment', value: 'Optimized', detail: 'Optimized spend across the organization\'s AVD environment' },
      { metric: 'Customer Service', value: 'Better', detail: 'Efficiently leveraged resources while better serving customers' }
    ],
    quote: "The Nerdio platform has enabled Karbon Homes to optimize spend across its AVD environment while still ensuring users have access to desktops when and where they need them. For a non-profit, the ability to automate and customize controls to more efficiently leverage our resources while better serving our customers is a win-win.",
    quotePerson: 'Karbon Homes',
    quoteTitle: 'Infrastructure and Operations Team',
    tags: ['nonprofit', 'housing', 'cost-optimization', 'emea']
  },

  {
    id: 'penn-state',
    company: 'Penn State University',
    industry: 'education',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'on-premises',
    headline: 'Nerdio bolsters new era of remote learning for Penn State University',
    situation: 'Historically, Penn State University used a product that only provided remote access to individual applications. With the onset of the pandemic in 2020, it needed a solution that allowed users to access physical labs from off campus.',
    solution: 'Penn State University leveraged Nerdio Manager to streamline the management of its Azure Virtual Desktop environment, improving automation, scalability, and cost efficiency while supporting a large user base across the university.',
    impacts: [
      { metric: 'Cost Savings', value: '70%+', detail: 'Saved more than 70% on AVD bill' },
      { metric: 'Configuration', value: 'Less time', detail: 'Spent less time on manual configuration' },
      { metric: 'Host Management', value: 'Automated', detail: 'Automated monotonous work, such as session host management' }
    ],
    quote: "I can quickly and easily provide high-level insights to my superiors and other key decision makers within the organization when it comes to matters that impact costs, like host pool sizing and purchasing reserved instances. We can then optimize our performance while reducing our overall spend.",
    quotePerson: 'Ian Cohn',
    quoteTitle: 'Pennsylvania State University Systems Design Specialist',
    tags: ['education', 'higher-ed', 'remote-learning', 'cost-optimization']
  },

  {
    id: 'anonymous-healthcare',
    company: 'Pediatric Healthcare Provider',
    industry: 'healthcare',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'citrix',
    headline: 'A healthy dose of savings: Pediatric care reimagined with Nerdio and AVD',
    situation: 'A pediatric healthcare provider struggled with high costs and complexity using Citrix for remote access, limiting its ability to deliver efficient patient care.',
    solution: 'Transitioning to Azure Virtual Desktop managed by Nerdio, the pediatric healthcare provider streamlined IT management, reduced complexity, and enabled secure, flexible access to patient records and clinical applications from any device.',
    impacts: [
      { metric: 'Cost Savings', value: '50%', detail: 'Achieved 50% cost savings compared to Citrix, reducing IT expenses' },
      { metric: 'Care Delivery', value: 'Improved', detail: 'Improved care delivery through enhanced remote access' },
      { metric: 'Operations', value: 'Increased efficiency', detail: 'Increased operational efficiency across the healthcare system' }
    ],
    quote: "The cost savings from eliminating unused resources make Nerdio a no-brainer. Auto-Scaling allows me to do in a few clicks what would have taken extensive manual configuration of VMs (virtual machines) in Azure.",
    quotePerson: 'Core Infrastructure Engineer',
    quoteTitle: 'Pediatric Healthcare Provider',
    tags: ['healthcare', 'citrix-migration', 'cost-optimization', 'patient-care']
  },

  {
    id: 'outokumpu',
    company: 'Outokumpu',
    industry: 'manufacturing',
    size: 'enterprise',
    location: 'global',
    employeeCount: null,
    sourcePlatform: 'citrix',
    headline: 'Nerdio helps transform VDI management and drive efficiency',
    situation: 'Outokumpu\'s reliance on Citrix-based VDI created operational challenges, with complex management, rising costs, and long-term contracts.',
    solution: 'Outokumpu implemented Nerdio + AVD, gaining dynamic Auto-Scaling, simplified management, and a pay-as-you-go model to replace costly multi-year contracts.',
    impacts: [
      { metric: 'Downtime Risk', value: 'Reduced', detail: 'Reduced downtime risk across 1500 applications' },
      { metric: 'Capital Savings', value: 'Significant', detail: 'Saved significant capital by moving to consumption-based expenses' },
      { metric: 'VDI Management', value: 'Faster', detail: 'Enabled faster VDI management for internal teams' }
    ],
    quote: "With Nerdio, I can consume zero resources when nobody is using the system, and once someone arrives, it will automatically create the VM. That level of efficiency is unmatched.",
    quotePerson: 'Jani Anttila',
    quoteTitle: 'Service Manager for Virtual and Platform Services',
    tags: ['manufacturing', 'citrix-migration', 'auto-scaling', 'global']
  },

  {
    id: 'damart',
    company: 'Damart',
    industry: 'retail',
    size: 'enterprise',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'citrix',
    headline: 'Damart saves on resourcing and compute with Nerdio',
    situation: 'Damart, part of Groupe Damartex, began using Azure Virtual Desktop (AVD) to replace Citrix, but quickly identified gaps in management capabilities, leading them to seek a better solution.',
    solution: 'Damart implemented Nerdio Manager, which provided improved AVD management, scalability, and cost savings through auto-scaling and simplified administration.',
    impacts: [
      { metric: 'Licensing & Labor', value: '50%', detail: 'Saved approximately 50% on both licensing and labor costs' },
      { metric: 'Deployment', value: 'Rapid', detail: 'Achieved rapid deployment, with production environments set up in under a month' },
      { metric: 'AVD Management', value: 'Avoided FTEs', detail: 'Avoided the need to hire 1–2 additional FTEs for AVD management' }
    ],
    quote: "Through using AVD with Nerdio Manager, Damart saves approximately 50% on licensing costs and 50% on labor and resourcing costs. Nerdio Manager\'s Auto-Scaling is the source of our significant compute cost savings.",
    quotePerson: 'Romain Dupont',
    quoteTitle: 'Digital Workplace Manager',
    tags: ['retail', 'citrix-migration', 'cost-optimization', 'emea']
  },

  {
    id: 'setfords',
    company: 'Setfords',
    industry: 'legal',
    size: 'enterprise',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'citrix',
    headline: 'Setfords sees up to 50% cost savings with Nerdio',
    situation: 'Setfords is one of the UK\'s largest legal firms. Its Citrix-based virtual desktop environment was costly and complex, causing significant downtime and operational inefficiencies. Multi-year contracts and cumbersome updates disrupted workflows for their international team.',
    solution: 'By transitioning to Azure Virtual Desktop with Nerdio Manager for Enterprise, Setfords gained access to advanced features, such as dynamic Auto-Scaling, local client monitoring, and seamless patching cycles, enabling significant cost savings and streamlined operations.',
    impacts: [
      { metric: 'Cost Savings', value: '40-50%', detail: 'Reduced Azure costs by 40–50%' },
      { metric: 'Downtime', value: 'Reduced', detail: 'Reduced downtime for updates and deployments from hours to minutes' },
      { metric: 'IT Efficiency', value: 'Improved', detail: 'Improved IT team efficiency with automated scaling and simplified monitoring' }
    ],
    quote: "Before Nerdio, we had to monitor the system constantly to ensure we didn't run out of capacity. Now, we can automatically scale resources based on demand, so we don't have to worry about it. This feature alone has saved us significant time and resources.",
    quotePerson: 'Luke Clements',
    quoteTitle: 'IT Support Technician, Setfords',
    tags: ['legal', 'citrix-migration', 'auto-scaling', 'emea']
  },

  {
    id: 'asda',
    company: 'ASDA',
    industry: 'retail',
    size: 'enterprise',
    location: 'emea',
    employeeCount: 5000,
    sourcePlatform: 'vmware',
    headline: 'Asda stocks up on savings using Azure Virtual Desktop and Nerdio',
    situation: 'To support rapid growth, Asda needed to move from on-premises infrastructure to a cloud-native environment. While VMware Horizon Cloud was considered, its costs and rigid licensing led Asda to choose AVD for its scalability and cost-effectiveness. However, managing AVD natively for a deployment of Asda\'s scale required additional tools.',
    solution: 'To enhance AVD management, Asda implemented Nerdio Manager for Enterprise, automated deployment, automated tasks, and introduced powerful features, such as Auto-Scaling, enabling Asda\'s IT team to efficiently manage thousands of desktops while minimizing costs and administrative workload.',
    impacts: [
      { metric: 'Cost Savings', value: '£56,000/mo', detail: 'Saved £56,000 monthly with Nerdio Auto-Scaling' },
      { metric: 'Manual Work', value: 'Reduced', detail: 'Reduced manual work through automation' },
      { metric: 'Scale', value: '400 to 5,000', detail: 'Scaled seamlessly from 400 to 5,000 desktops over two years' }
    ],
    quote: "At the end of the day, Nerdio enabled us to save £56,000 a month while scaling to meet our business goals.",
    quotePerson: 'Senior Engineer',
    quoteTitle: 'Asda',
    tags: ['retail', 'vmware-migration', 'auto-scaling', 'emea', 'rapid-growth']
  },

  {
    id: 'oregon-state',
    company: 'Oregon State University',
    industry: 'education',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'vmware',
    headline: 'Oregon State University\'s College of Business shifts to smart lab management with Nerdio and AVD',
    situation: 'OSU\'s College of Business needed a flexible, cost-effective solution to modernize its open-use student lab of 120 machines. The on-premises VMware Horizon environment was costly, inflexible, and unable to meet the dynamic needs of students.',
    solution: 'OSU transitioned its student lab to Azure Virtual Desktop with Nerdio Manager for Enterprise, enabling on-demand access to resources, automated scaling, and cost-effective management tailored to the needs of students and faculty.',
    impacts: [
      { metric: 'Cost Reduction', value: 'Significant', detail: 'Reduced costs by only running compute when needed' },
      { metric: 'Capacity', value: '2x', detail: 'Delivered twice the compute power to students' },
      { metric: 'IT Time', value: '40% saved', detail: 'Saved 40% of the IT team\'s time using automation' }
    ],
    quote: "With Nerdio, we deliver twice the compute power to students while gaining the flexibility to scale up or down based on their needs. It's a game-changer for modern learning.",
    quotePerson: 'Alan Sprague',
    quoteTitle: 'IT Manager, Oregon State University College of Business',
    tags: ['education', 'higher-ed', 'vmware-migration', 'student-labs']
  },

  {
    id: 'city-of-corona',
    company: 'City of Corona',
    industry: 'government',
    size: 'enterprise',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'multiple-tools',
    headline: 'City of Corona strengthens endpoint security and IT efficiency with Nerdio',
    situation: 'The city of Corona faced growing cybersecurity threats and the complexity of managing IT infrastructure across multiple tools, including Intune, Azure, and AVD. The IT team needed a centralized solution for endpoint management, security, compliance monitoring, and streamlined operations without spending hours navigating the Azure portal.',
    solution: 'The city of Corona turned to Nerdio to optimize AVD, particularly for cost tracking and provisioning. As they expanded their cloud strategy with Windows 365 and Intune, it became clear that Nerdio could serve as a single pane of glass for endpoint management, security, and compliance tracking.',
    impacts: [
      { metric: 'Management', value: 'Unified', detail: 'Managed Windows 365, AVD, and endpoints from one interface' },
      { metric: 'Help Desk', value: 'Enabled', detail: 'Enabled help desk to quickly diagnose issues without diving deep into Azure' },
      { metric: 'Cloud Spending', value: 'Optimized', detail: 'Optimized cloud spending by tracking per-user AVD costs and adjusting resources accordingly' }
    ],
    quote: "With Nerdio, we've moved from reactive to proactive IT management to proactive security and automation. It's a total shift in how we operate.",
    quotePerson: 'Brad Ransbury',
    quoteTitle: 'Systems Administrator, City of Corona',
    tags: ['government', 'public-sector', 'security', 'endpoint-management', 'windows-365']
  },

  // ============== MSP CASE STUDIES ==============

  {
    id: 'l7-solutions',
    company: 'L7 Solutions',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: 29,
    sourcePlatform: 'legacy-rmm',
    headline: 'How L7 Solutions transformed IT management with Nerdio and Microsoft Intune',
    situation: 'L7 Solutions, a South Florida-based MSP, faced significant operational inefficiencies. Managing customers at scale was labor-intensive, with each tenant setup taking approximately 8–9 hours. The lack of a unified system led to inconsistent security enforcement and increased the risk of human errors.',
    solution: 'Implemented NMM to automate IT operations and standardize management across all client environments. By integrating with Intune, L7 replaced manual, time-consuming setup processes with near real-time deployments, centralized policy enforcement, and a scalable Microsoft-native platform.',
    impacts: [
      { metric: 'User Experience', value: 'Improved', detail: 'Improved user experience, allowing employees to receive fully configured workspaces instantly, boosting productivity' },
      { metric: 'Setup Time', value: '90% reduction', detail: '90% reduction in IT setup time, significantly accelerating client onboarding' },
      { metric: 'Security', value: 'Consistent', detail: 'Elimination of security drift through consistent, automated policy enforcement, enhancing compliance' }
    ],
    quote: "Our employees love working with Nerdio because it simplifies their jobs and lets them focus on what really matters—building strong connections with our customers. Happy employees mean happy customers.",
    quotePerson: 'Chris Brannon',
    quoteTitle: 'Director of Technology, L7 Solutions',
    tags: ['msp', 'intune', 'automation', 'onboarding']
  },

  {
    id: 'decision-digital',
    company: 'Decision Digital',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: 13,
    sourcePlatform: 'manual-processes',
    headline: 'Decision Digital saves time with Nerdio Manager for MSP',
    situation: 'Atlanta-based MSP Decision Digital needed a more efficient way to manage Azure Virtual Desktop (AVD) environments. Manual processes at previous companies had proven time-consuming, error-prone, and overwhelming.',
    solution: 'Nerdio Manager for MSP transformed AVD management with automation, high-level overviews, and streamlined workflows, enabling faster provisioning, patching, and troubleshooting. Scripted actions and ease of use allowed technicians to complete complex tasks with just a few clicks.',
    impacts: [
      { metric: 'Build Time', value: '1 week to 30 min', detail: 'Reduced environment build time from one week to 30 minutes' },
      { metric: 'Tasks', value: 'Simplified', detail: 'Simplified tasks, minimizing errors and frustrations' },
      { metric: 'Technician Hours', value: '12 saved annually', detail: 'Saved 12 technician hours annually on patching alone' }
    ],
    quote: "To be 100% honest, the whole Nerdio Manager platform is a huge time saver. It's not just about the time—it's the frustration and headaches it eliminates.",
    quotePerson: 'Scott Key',
    quoteTitle: 'Service Delivery Manager, Decision Digital',
    tags: ['msp', 'avd-management', 'time-savings', 'automation']
  },

  {
    id: 'centre-technologies',
    company: 'Centre Technologies',
    industry: 'msp',
    size: 'midsize',
    location: 'north-america',
    employeeCount: 230,
    sourcePlatform: 'citrix',
    headline: 'Centre Technologies unlocks $500,000 in annual savings with Nerdio',
    situation: 'Centre Technologies, a Houston-based MSP with over 800 clients, faced rising costs and complexity with using Citrix for virtual desktops. Managing Azure Virtual Desktop(AVD) due to knowledge gaps without multi-tenant tools further strained operations and profitability.',
    solution: 'Centre replaced Citrix with AVD and Nerdio Manager for MSP, gaining automation and pay-as-you-go flexibility for MSP. Nerdio enabled streamlined AVD management, maintenance, cost control, and scalable client services.',
    impacts: [
      { metric: 'Annual Savings', value: '$500,000', detail: 'Achieved $500,000 in annual savings, including 55% on Azure costs' },
      { metric: 'Operations', value: 'Improved', detail: 'Improved operations without adding headcount' },
      { metric: 'Client Retention', value: 'Increased', detail: 'Increased client retention and reduced virtual desktop issues' }
    ],
    quote: "Nerdio lets us say 'yes' to clients more often, solve their problems faster, and help them grow. It's a no-brainer.",
    quotePerson: 'Todd Smith',
    quoteTitle: 'Chief Technology Officer, Centre Technologies',
    tags: ['msp', 'citrix-migration', 'cost-optimization', 'client-retention']
  },

  {
    id: 'wheelhouse-it',
    company: 'WheelHouse IT',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: 42,
    sourcePlatform: 'diy-solution',
    headline: 'From DIY to done right: How WheelHouse IT boosted efficiency and profitability with Nerdio',
    situation: 'WheelHouse IT, a prominent MSP with experience in multiple virtual desktop platforms, faced scalability and efficiency issues for managing virtual machines, and efficiency issues for managing virtual machines, leading to client downtime.',
    solution: 'After initially experimenting with a DIY solution, WheelHouse IT implemented Nerdio Manager for MSP, which streamlined AVD deployments, provided role-based access, and reduced the complexity of virtual desktop management.',
    impacts: [
      { metric: 'Client Service', value: 'Enhanced', detail: 'Enhanced client service through faster deployments and seamless migrations' },
      { metric: 'Cloud Costs', value: 'Reduced', detail: 'Reduced cloud costs, optimizing vendor selection and scaling virtual desktop environments' },
      { metric: 'Efficiency', value: 'Increased', detail: 'Increased operational efficiency and profitability by simplifying workflows' }
    ],
    quote: "We quickly identified Nerdio Manager for MSP as the standout solution in this space. The platform's intuitive interface and granular access controls empower all of our engineers to universally administer, manage, and implement AVD deployments without compromising security.",
    quotePerson: 'Nikko Pabion',
    quoteTitle: 'Director of Technology',
    tags: ['msp', 'avd-management', 'profitability', 'efficiency']
  },

  {
    id: 'greene-is',
    company: 'Greene IS',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: 28,
    sourcePlatform: 'manual-avd',
    headline: 'Scaling success: How Greene IS transformed growth and compliance with Nerdio',
    situation: 'Greene Information Systems faced challenges in scaling its business, managing Azure costs, and deploying Microsoft AVD due to knowledge gaps and complex processes.',
    solution: 'After attending NerdioCon and implementing Nerdio Manager for MSP, Greene streamlined AVD deployments, enhanced operational efficiency, and improved cost forecasting through Nerdio\'s platform and training.',
    impacts: [
      { metric: 'AVD Performance', value: 'Scaled quickly', detail: 'Scaled AVD quickly, boosting satisfaction and performance' },
      { metric: 'Compliance', value: 'Achieved', detail: 'Achieved compliance, reducing costs and meeting strict regulations' },
      { metric: 'Margins', value: 'Increased', detail: 'Increased margins, supporting growth and seamless M&A' }
    ],
    quote: "Without Nerdio, there's no way we could widely deploy AVD across our clients and stay profitable. This enterprise-grade technology allows us to manage hundreds of nodes across dozens of clients with speed and efficiency.",
    quotePerson: 'Skip Klemz',
    quoteTitle: 'Director of Service Delivery, Greene IS',
    tags: ['msp', 'scaling', 'compliance', 'profitability']
  },

  {
    id: 'managed-services-it',
    company: 'Managed Services IT',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'traditional-infrastructure',
    headline: 'Cloud-powered efficiency: How MSIT transformed IT services and scalability with Nerdio',
    situation: 'Managed Services IT (MSIT), a cloud-first MSP, struggled with cumbersome traditional IT infrastructure, leading to delays and inefficiencies while trying to modernize its offerings to embrace cloud environments.',
    solution: 'By leveraging Nerdio Manager for MSP, MSIT streamlined Azure deployments, automated administrative tasks, and optimized IT infrastructure for its clients, significantly improving operational efficiency.',
    impacts: [
      { metric: 'Automation', value: 'Enabled', detail: 'Enabled one technician to do the work of three with automation' },
      { metric: 'Work-Life Balance', value: 'Improved', detail: 'Improved technician work-life balance, eliminating after-hours tasks' },
      { metric: 'Client Satisfaction', value: 'Enhanced', detail: 'Enhanced client satisfaction and productivity through GPU-enabled desktops, eliminating costly hardware investments' }
    ],
    quote: "With Nerdio's automation, streamlined processes, and user-friendly interface, one technician can now accomplish the work of three, allowing us to scale our business without increasing headcount.",
    quotePerson: 'Jim Brennan',
    quoteTitle: 'President of Managed Services IT',
    tags: ['msp', 'cloud-first', 'automation', 'scalability']
  },

  {
    id: 'verified-technologies',
    company: 'Verified Technologies',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'on-premises',
    headline: 'From on-premises to cloud powerhouse: How Verified Technologies transformed IT with Nerdio',
    situation: 'Verified Technologies struggled with the inefficiencies of traditional on-premises hardware and faced resistance from clients to migrate to cloud solutions, which hindered its ability to modernize services.',
    solution: 'By implementing Nerdio Manager for MSP, Verified Technologies streamlined its operations, automated complex tasks, and provided a scalable cloud-based virtual desktop solution that improved service delivery and operational efficiency.',
    impacts: [
      { metric: 'Complexity', value: 'Reduced', detail: 'Reduced operational complexity and increased efficiency through automation' },
      { metric: 'Disaster Scaling', value: 'Rapid', detail: 'Enabled rapid disaster scaling, ensuring business continuity for clients with no downtime' },
      { metric: 'Client Relationships', value: 'Strengthened', detail: 'Strengthened client relationships with responsive, tailored cloud solutions' }
    ],
    quote: "Nerdio has been like a Swiss Army Knife for my team, allowing us to efficiently tackle nearly every obstacle we encounter, whether that's spinning up another server or providing remote access.",
    quotePerson: 'Alan Dawson',
    quoteTitle: 'President of Verified Technologies',
    tags: ['msp', 'cloud-migration', 'disaster-recovery', 'automation']
  },

  {
    id: 'trustack',
    company: 'Trustack',
    industry: 'msp',
    size: 'smb',
    location: 'emea',
    employeeCount: null,
    sourcePlatform: 'legacy-vdi',
    headline: 'Trustack\'s transformation: Achieving 2-3x more projects with Nerdio Manager\'s Auto-Scaling and efficiency',
    situation: 'Trustack faced escalating costs and inefficiencies with legacy VDI solutions and needed a secure, scalable cloud-based VDI solution.',
    solution: 'Trustack adopted Nerdio Manager for AVD, streamlining VDI management and significantly reducing operational complexity and costs through auto-scaling and allowing its team to allocate resources more strategically.',
    impacts: [
      { metric: 'Update Costs', value: 'Reduced', detail: 'Reduced update costs with auto-scaling and automated patching' },
      { metric: 'Efficiency', value: '2-3x', detail: 'Increased efficiency, completing 2-3x more projects than traditional VDI' },
      { metric: 'Business Model', value: 'Shifted', detail: 'Shifted from CapEx to a sustainable monthly OpEx model' }
    ],
    quote: "Once fully into the rhythm of delivering AVD with Nerdio, we will be able to ship two or three times as many projects as we will be able to ship two or three times as many while delivering better service to our customers.",
    quotePerson: 'Russ Henderson',
    quoteTitle: 'Technical Director, Trustack',
    tags: ['msp', 'auto-scaling', 'efficiency', 'emea']
  },

  {
    id: 'acts360',
    company: 'ACTS360',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'private-cloud',
    headline: 'ACTS360 journeys from private clouds to Microsoft Azure with Nerdio',
    situation: 'ACTS360 faced rising costs and performance issues with private cloud providers, resulting in client losses and a need for a reliable, cost-effective solution within a tight 30-day window.',
    solution: 'ACTS360 migrated to Microsoft Azure with Nerdio, simplifying application management, reducing costs with Auto-Scaling, and enabling more junior employees to handle daily maintenance tasks.',
    impacts: [
      { metric: 'Senior Reliance', value: 'Reduced', detail: 'Reduced reliance on senior engineers for daily tasks, improving team efficiency' },
      { metric: 'Client Feedback', value: '99% positive', detail: 'Achieved 99% positive client feedback' },
      { metric: 'Operations', value: 'Scaled', detail: 'Scaled operations without additional hires, boosting profit margins' }
    ],
    quote: "The transition to a public cloud was scary at first, but after seeing how robust yet easily manageable Azure can be, I regret not making the move years ago. Nerdio has delivered on its promises tenfold.",
    quotePerson: 'Greg Sweers',
    quoteTitle: 'Chief Executive Officer, ACTS360',
    tags: ['msp', 'azure-migration', 'cost-optimization', 'client-satisfaction']
  },

  {
    id: 'kite-technology',
    company: 'Kite Technology Group',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'traditional-setups',
    headline: 'Kite Technology sees productivity soar with Nerdio Modern Work management',
    situation: 'Kite Technology Group, an MSP serving independent insurance agencies, needed an efficient way to support clients with limited IT budgets and staff. Their goal was to provide secure, scalable solutions that enable hybrid work without the complexity of traditional IT setups.',
    solution: 'With Nerdio Manager\'s new Modern Work capabilities, Kite Technology can now centrally manage Microsoft 365 environments, providing streamlined security, disaster recovery, and device management across all clients, delivering the benefits of a cloud-first approach.',
    impacts: [
      { metric: 'Setup Time', value: 'Minutes', detail: 'Cut device setup time from hours to minutes' },
      { metric: 'Security', value: 'Enhanced', detail: 'Enhanced security with automated updates and policy enforcement' },
      { metric: 'Tenant Management', value: 'Scaled', detail: 'Scaled tenant management across hundreds of devices seamlessly' }
    ],
    quote: "With Nerdio Manager\'s Modern Work capabilities overseeing Microsoft Modern Workplace, our tools help us deliver the value and peace of mind our customers expect.",
    quotePerson: 'Adam Atwell',
    quoteTitle: 'Partner and CTO, Kite Technology Group',
    tags: ['msp', 'modern-work', 'insurance', 'microsoft-365']
  },

  {
    id: 'tyr-technologies',
    company: 'TYR Technologies',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'manual-avd',
    headline: 'From 8 hours to 2: How TYR Technologies streamlined AVD management and cut costs by 65%',
    situation: 'TYR Technologies, a growing MSP in Western Canada, was struggling with manual AVD management that consumed up to eight hours per update and drove unsustainable Azure costs. Senior engineers were bogged down in repetitive tasks, leaving little room for innovation or growth.',
    solution: 'By adopting Nerdio, TYR cut image update times from eight hours to two, standardized AVD deployments, and automated key processes like powering down VMs after hours. This not only reduced costs but also empowered junior technicians to take on more responsibility, freeing senior engineers to focus on high-value projects.',
    impacts: [
      { metric: 'Azure Costs', value: '65% savings', detail: '65% Azure cost savings with intelligent Auto-Scaling' },
      { metric: 'Update Time', value: '8 hrs to 2 hrs', detail: '80% time savings on routine updates (8 hrs → 2 hrs)' },
      { metric: 'Team Growth', value: 'Empowered', detail: 'Empowered team growth, with junior staff driving innovation more and senior staff' }
    ],
    quote: "Instead of paying for 24-hour VM usage, we're only paying for what our clients actually use, which has been a game-changer for cost savings and client satisfaction.",
    quotePerson: 'Lyndon Will',
    quoteTitle: 'Founder and President',
    tags: ['msp', 'cost-optimization', 'time-savings', 'team-empowerment']
  },

  {
    id: 'teamlogic-it',
    company: 'TeamLogic IT',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'native-azure',
    headline: 'How TeamLogic IT slashed Azure costs by 60% and scaled cloud operations with Nerdio\'s Microsoft 365 management solution',
    situation: 'TeamLogic IT struggled to keep up with rising cloud demand. With only a few engineers skilled in Azure, projects were slow to scale, sales cycles dragged on for weeks, and high Azure costs made cloud adoption less appealing to customers.',
    solution: 'By adopting Nerdio, TeamLogic IT expanded its cloud team, automated routine tasks, and cut Azure costs by up to 60%. Sales quotes now take days instead of weeks, engineers focus on high-value projects, and clients benefit from faster, more affordable cloud solutions.',
    impacts: [
      { metric: 'Azure Costs', value: '55-60% cut', detail: 'Cut Azure costs by 55–60% with intelligent Auto-Scaling' },
      { metric: 'Azure Team', value: 'Expanded', detail: 'Built a stronger Azure expertise company-wide, expanding Azure team' },
      { metric: 'Engineer Focus', value: 'Strategic', detail: 'Automated routine tasks, freeing engineers for strategic, high-impact projects' }
    ],
    quote: "Every time there's a new feature, it's something that makes our lives easier. Nerdio listens to MSPs and builds what we need. That's not something you see every day.",
    quotePerson: 'Mark Olenik',
    quoteTitle: 'Director of Engineering',
    tags: ['msp', 'cost-optimization', 'auto-scaling', 'team-growth']
  },

  {
    id: 'solarus-technologies',
    company: 'Solarus Technologies',
    industry: 'msp',
    size: 'smb',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'manual-onboarding',
    headline: 'How Solarus Technologies boosted Azure efficiency 30% through automation',
    situation: 'Solarus Technologies was looking to support a growing base of SMB clients while keeping costs and staffing levels stable. Manual onboarding and update processes consumed valuable time, creating pressure on engineers and limiting scalability.',
    solution: 'By partnering with Nerdio, the team streamlined onboarding, updates, and ongoing cloud management. Nerdio\'s automation and simplified workflows allowed them to deliver faster, more efficient service to every client without needing to expand headcount.',
    impacts: [
      { metric: 'Efficiency', value: '20-30%', detail: '20–30% efficiency gains across onboarding, updates, and management' },
      { metric: 'SMB Clients', value: '75-100', detail: '75–100 SMB clients supported without adding staff' },
      { metric: 'Partnership', value: '5+ years', detail: '5+ years of continuous partnership and trusted account management and support' }
    ],
    quote: "Nerdio lets us scale without increasing headcount—it's efficiency and growth built in.",
    quotePerson: 'Matthew Nikravesh',
    quoteTitle: 'CEO of Solarus Technologies',
    tags: ['msp', 'automation', 'smb-clients', 'efficiency']
  },

  {
    id: 'inhouse-support',
    company: 'Inhouse-Support',
    industry: 'msp',
    size: 'msp',
    location: 'north-america',
    employeeCount: null,
    sourcePlatform: 'manual-avd',
    headline: 'How Inhouse-Support achieved a 7,800% efficiency gain and reignited employee engagement with Nerdio',
    situation: 'Inhouse-Support, a North America–based MSP, was struggling with manual, 32-hour Azure Virtual Desktop (AVD) deployments, reduced growth, slowed profitability, and left senior engineers stuck in repetitive tasks—driving burnout and risking employee churn.',
    solution: 'By adopting Nerdio Manager for MSP, Inhouse-Support automated and standardized AVD deployments, reducing setup time from 32 hours to just 15 minutes. With Nerdio Enhanced Support and a built-in cost estimator, the team gained faster troubleshooting, predictable pricing, and scalable processes that empowered junior technicians while freeing senior staff for strategic projects.',
    impacts: [
      { metric: 'Efficiency', value: '7,800%', detail: '7,800% efficiency gain (32 hrs → 15 mins per deployment)' },
      { metric: 'Migrations', value: '4 per week', detail: '4 client migrations in a single week (vs. 1 every two weeks before)' },
      { metric: 'Salary Equivalent', value: '1 FTE saved', detail: '1 full-time salary equivalent saved through automation and reduced manual work' }
    ],
    quote: "We used to spend 32 hours deploying a single client. With Nerdio, it took 15 minutes.",
    quotePerson: 'Ben Estephan',
    quoteTitle: 'Owner of Inhouse-Support',
    tags: ['msp', 'efficiency', 'automation', 'employee-engagement']
  },

  {
    id: 'proarch',
    company: 'ProArch',
    industry: 'msp',
    size: 'msp',
    location: 'global',
    employeeCount: null,
    sourcePlatform: 'device-based-model',
    headline: 'ProArch charts a path to 50% efficiency gains with Nerdio-powered support offering',
    situation: 'ProArch was looking to modernize its managed support services without increasing prices. Their existing support model was device-based, creating complexity and customer frustration, slow onboarding, and lots of repetitive engineering work.',
    solution: 'In early 2024, ProArch launched a new offering called GuardAssist, powered by Nerdio Manager for MSP. GuardAssist embraces automation, tight integration with Microsoft Intune and Azure Arc, and enhanced reporting. These changes shifted ProArch to a user-based billing model, accelerated onboarding, and improved security baselines.',
    impacts: [
      { metric: 'Efficiency', value: '20-25%', detail: 'Operational efficiency improved by 20-25%, with projections to reach ~50% as legacy contracts move to GuardAssist' },
      { metric: 'Maintenance', value: 'Freed engineers', detail: 'Senior engineers freed from repetitive maintenance work, enabling them to do higher-value projects' },
      { metric: 'Onboarding', value: 'Faster', detail: 'Faster time-to-resolution and smoother onboarding for new customers' }
    ],
    quote: "Nerdio is great at solving the 'penny' problems'—small tasks that don't take long individually, but eat up hours in aggregate.",
    quotePerson: 'Greg Dodge',
    quoteTitle: 'Customer Advisor, ProArch',
    tags: ['msp', 'guardassist', 'intune', 'efficiency']
  },

  {
    id: 'york-county',
    company: 'York County Community Action Corporation',
    industry: 'nonprofit',
    size: 'smb',
    location: 'north-america',
    employeeCount: 15000,
    sourcePlatform: 'vmware-citrix',
    headline: 'York County Community Action Corporation modernizes virtual desktop infrastructure with Microsoft, Nerdio, and DataON to better serve its community',
    situation: 'York County Community Action Corporation (YCCAC), a Maine-based nonprofit serving 15,000 residents, faced rising VMware and Citrix costs, slow onboarding, and heavy patching workloads. Strict compliance and data-locality requirements made a full cloud move impossible, prompting the search for a secure, cost-efficient on-premises modernization path.',
    solution: 'Partnering with Dirigo Technology, Microsoft, Nerdio, and DataON, YCCAC deployed Azure Virtual Desktop with Azure Local, managed through Nerdio Manager for Enterprise. The solution automated provisioning and scaling, simplified management, and delivered a compliant hybrid environment that improved performance while cutting costs.',
    impacts: [
      { metric: 'Host Reduction', value: '63%', detail: '63% reduction in hosts (from 40 to 15) with improved system performance' },
      { metric: 'Onboarding', value: 'Faster', detail: 'Faster onboarding and management through automation' },
      { metric: 'Sustainability', value: 'Greater', detail: 'Greater sustainability, allowing IT to focus on community programs' }
    ],
    quote: "Technology is not the end goal for us—it's a means to help people. With this new platform, our IT is reliable, efficient, and sustainable. That allows us to put our energy where it belongs: supporting our community.",
    quotePerson: 'Terrence McCarthy',
    quoteTitle: 'York County Community Action Corporation',
    tags: ['nonprofit', 'vmware-migration', 'citrix-migration', 'azure-local', 'compliance']
  },

  {
    id: 'syneos-health',
    company: 'Syneos Health',
    industry: 'healthcare',
    size: 'enterprise',
    location: 'global',
    employeeCount: 21000,
    sourcePlatform: 'manual-avd',
    headline: 'Syneos Health: 70% faster changes and thousands saved per quarter with Nerdio',
    situation: 'Syneos Health\'s IT team supports a 21,000+ person global workforce using Azure Virtual Desktop (AVD). Managing AVD natively required manual, host-by-host updates, which slowed patching delays, and inflated cloud spend due to always-on compute and limited visibility.',
    solution: 'Syneos implemented Nerdio Manager for Enterprise to unify and automate AVD management. Auto-Scaling powered down unused VMs after hours, automated maintenance—reducing patching, and image maintenance were automated—reducing updates from hours to minutes—and reclaiming time for higher-value work.',
    impacts: [
      { metric: 'Quarterly Savings', value: 'Thousands', detail: 'Thousands saved per quarter through Auto-Scaling and reduced always-on compute' },
      { metric: 'Changes', value: '70% faster', detail: '70% faster operational changes across AVD environments' },
      { metric: 'Manual Effort', value: '15% less', detail: '15% less manual effort on patching and maintenance' }
    ],
    quote: "From the business side, the most noticeable benefit is how quickly we can execute. From patching to scaling, everything moves faster now.",
    quotePerson: 'Linwood Hunter',
    quoteTitle: 'Senior Workstation Engineer, Syneos Health',
    tags: ['healthcare', 'enterprise', 'auto-scaling', 'global']
  },

  {
    id: 'waterman-group',
    company: 'Waterman Group',
    industry: 'engineering',
    size: 'enterprise',
    location: 'emea',
    employeeCount: 1300,
    sourcePlatform: 'on-premises',
    headline: 'Waterman Group modernizes end-user computing and cuts Azure costs, saving 20% of its IT budget annually with Nerdio',
    situation: 'Waterman Group, a leading engineering and environmental consultancy, needed a more inclusive, scalable, and cost-efficient digital workplace. Microsoft\'s native AVD tools offered limited automation and visibility while Azure compute costs across 1,300 virtual machines drove unsustainable costs.',
    solution: 'Deploying Nerdio Manager for Enterprise via the Azure Marketplace, Waterman automated provisioning, monitoring, and Auto-Scaling and aligned AVD usage to real-time cost dashboards—reducing unnecessary compute spend and freeing IT hours to focus on innovation and accessibility.',
    impacts: [
      { metric: 'IT Budget', value: '20% reduction', detail: '20% reduction in IT budget through Azure cost optimization' },
      { metric: 'Compute Spend', value: '75% lower', detail: '75% lower compute spend by aligning usage to working hours' },
      { metric: 'Deployment', value: '2-hour', detail: 'Two-hour deployment through Azure Marketplace' }
    ],
    quote: "The inclusivity is a really important point for me, and Nerdio made AVD an inclusive computer system that everyone can use. It's flexible, and I've got control of the costs.",
    quotePerson: 'Stuart Worrow',
    quoteTitle: 'Group IT Director, Waterman Group',
    tags: ['engineering', 'cost-optimization', 'inclusivity', 'emea']
  }
];

// Industry mappings for matching
export const industryMappings = {
  'financial-services': ['financial-services', 'banking', 'insurance', 'fintech'],
  'healthcare': ['healthcare', 'pharma', 'biotech', 'medical'],
  'education': ['education', 'higher-ed', 'k12', 'training'],
  'government': ['government', 'public-sector', 'federal', 'state', 'local'],
  'retail': ['retail', 'ecommerce', 'consumer-goods'],
  'manufacturing': ['manufacturing', 'industrial', 'automotive'],
  'legal': ['legal', 'law-firm', 'professional-services'],
  'logistics': ['logistics', 'shipping', 'transportation', 'supply-chain'],
  'nonprofit': ['nonprofit', 'charity', 'ngo', 'foundation'],
  'msp': ['msp', 'it-services', 'managed-services'],
  'engineering': ['engineering', 'construction', 'architecture'],
  'agriculture': ['agriculture', 'farming', 'agribusiness'],
  'energy': ['energy', 'utilities', 'oil-gas']
};

// Platform mappings for matching
export const platformMappings = {
  'citrix': ['citrix', 'citrix-cvad', 'citrix-daas', 'xenapp', 'xendesktop'],
  'vmware': ['vmware', 'vmware-horizon', 'horizon-cloud', 'omnissa'],
  'on-premises': ['on-premises', 'on-prem', 'physical', 'legacy'],
  'manual-avd': ['manual-avd', 'native-avd', 'avd-native'],
  'rds': ['rds', 'remote-desktop', 'terminal-services'],
  'aws': ['aws', 'workspaces', 'amazon'],
  'legacy-vdi': ['legacy-vdi', 'vdi', 'virtual-desktop']
};

// Size mappings
export const sizeMappings = {
  'enterprise': { min: 1000, max: Infinity },
  'midsize': { min: 250, max: 999 },
  'smb': { min: 1, max: 249 }
};

/**
 * Find relevant case studies based on customer profile
 * @param {Object} customerProfile - Customer profile data
 * @param {number} limit - Maximum number of results to return
 * @returns {Array} - Sorted array of relevant case studies with relevance scores
 */
export function findRelevantCaseStudies(customerProfile, limit = 3) {
  const {
    industry,
    userCount,
    sourcePlatform,
    location,
    companySize
  } = customerProfile;

  return caseStudies
    .map(study => {
      let score = 0;

      // Industry match (highest weight - 5 points for exact, 2 for related)
      if (study.industry === industry) {
        score += 5;
      } else if (industryMappings[study.industry]?.includes(industry) ||
                 industryMappings[industry]?.includes(study.industry)) {
        score += 2;
      }

      // Source platform match (4 points for exact, 2 for related)
      if (study.sourcePlatform === sourcePlatform) {
        score += 4;
      } else if (platformMappings[study.sourcePlatform]?.includes(sourcePlatform) ||
                 platformMappings[sourcePlatform]?.includes(study.sourcePlatform)) {
        score += 2;
      }

      // Size match (3 points)
      const studySize = study.size;
      if (studySize === companySize) {
        score += 3;
      } else if (
        (studySize === 'enterprise' && companySize === 'midsize') ||
        (studySize === 'midsize' && (companySize === 'enterprise' || companySize === 'smb'))
      ) {
        score += 1;
      }

      // User count proximity (2 points if within 50% range)
      if (study.employeeCount && userCount) {
        const ratio = study.employeeCount / userCount;
        if (ratio >= 0.5 && ratio <= 2) {
          score += 2;
        } else if (ratio >= 0.25 && ratio <= 4) {
          score += 1;
        }
      }

      // Location match (1 point)
      if (study.location === location) {
        score += 1;
      } else if (
        (study.location === 'global') ||
        (location === 'north-america' && study.location === 'north-america') ||
        (location === 'emea' && study.location === 'emea')
      ) {
        score += 0.5;
      }

      return {
        ...study,
        relevanceScore: score
      };
    })
    .filter(study => study.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Find case studies by source platform (for competitive battlecards)
 * @param {string} platform - Source platform to filter by
 * @param {number} limit - Maximum results
 * @returns {Array} - Case studies from that platform migration
 */
export function findCaseStudiesByPlatform(platform, limit = 5) {
  const normalizedPlatform = platform.toLowerCase();

  return caseStudies
    .filter(study => {
      if (study.sourcePlatform === normalizedPlatform) return true;
      if (platformMappings[normalizedPlatform]?.includes(study.sourcePlatform)) return true;
      if (study.tags?.some(tag => tag.includes(normalizedPlatform))) return true;
      return false;
    })
    .slice(0, limit);
}

/**
 * Find case studies by industry
 * @param {string} industry - Industry to filter by
 * @param {number} limit - Maximum results
 * @returns {Array} - Case studies from that industry
 */
export function findCaseStudiesByIndustry(industry, limit = 5) {
  const normalizedIndustry = industry.toLowerCase();

  return caseStudies
    .filter(study => {
      if (study.industry === normalizedIndustry) return true;
      if (industryMappings[normalizedIndustry]?.includes(study.industry)) return true;
      if (industryMappings[study.industry]?.includes(normalizedIndustry)) return true;
      return false;
    })
    .slice(0, limit);
}

/**
 * Get a random testimonial quote for use in emails/exports
 * @param {Object} filters - Optional filters { industry, platform, size }
 * @returns {Object} - Quote object with text, person, title, company
 */
export function getTestimonialQuote(filters = {}) {
  let filtered = [...caseStudies];

  if (filters.industry) {
    filtered = filtered.filter(s => s.industry === filters.industry);
  }
  if (filters.platform) {
    filtered = filtered.filter(s => s.sourcePlatform === filters.platform);
  }
  if (filters.size) {
    filtered = filtered.filter(s => s.size === filters.size);
  }

  // If no matches, use full list
  if (filtered.length === 0) {
    filtered = caseStudies;
  }

  const study = filtered[Math.floor(Math.random() * filtered.length)];

  return {
    quote: study.quote,
    person: study.quotePerson,
    title: study.quoteTitle,
    company: study.company,
    industry: study.industry,
    headline: study.headline
  };
}

/**
 * Get summary statistics from case studies for credibility
 * @returns {Object} - Aggregated statistics
 */
export function getCaseStudyStats() {
  const stats = {
    totalCustomers: caseStudies.length,
    industries: [...new Set(caseStudies.map(s => s.industry))].length,
    regions: [...new Set(caseStudies.map(s => s.location))].length,
    enterpriseCustomers: caseStudies.filter(s => s.size === 'enterprise').length,
    citrixMigrations: caseStudies.filter(s => s.sourcePlatform === 'citrix').length,
    vmwareMigrations: caseStudies.filter(s => s.sourcePlatform === 'vmware' || s.tags?.includes('vmware-migration')).length,
    mspPartners: caseStudies.filter(s => s.industry === 'msp').length
  };

  return stats;
}

export default caseStudies;
