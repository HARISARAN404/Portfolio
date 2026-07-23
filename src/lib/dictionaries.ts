export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export interface Dictionary {
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    participation: string;
    contact: string;
    theme: string;
  };
  hero: {
    name: string;
    role: string;
    location: string;
    intro: string;
    available: string;
  };
  about: {
    title: string;
    body: string;
  };
  skills: {
    title: string;
    groups: { name: string; items: string[] }[];
  };
  projects: {
    title: string;
    subtitle: string;
    selfInitiated: string;
    items: { title: string; description: string; stack: string[] }[];
  };
  education: {
    title: string;
    items: {
      degree: string;
      school: string;
      period: string;
      details: string;
      abbr: string;
      logo: string;
    }[];
  };
  participation: {
    title: string;
    items: {
      role: string;
      event: string;
      date: string;
      place: string;
    }[];
  };
  contact: {
    title: string;
    body: string;
    emailCta: string;
    phoneLabel: string;
  };
  footer: {
    elsewhere: string;
    builtWith: string;
  };
}

const en: Dictionary = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    participation: "Participation",
    contact: "Contact",
    theme: "Toggle theme",
  },
  hero: {
    name: "Harisaran Vasu",
    role: "Network Engineer",
    location: "Paris, France",
    intro:
      "I'm a network engineer in the making. I design, segment, and monitor enterprise-style networks: routing and switching, Active Directory, firewalls, VPNs, and cloud networking on AWS. Most of my spare time goes into building labs where I break things and then defend them. Right now I'm doing an MSc in Computer Science at EPITA in Paris.",
    available: "Open to network engineering roles across France.",
  },
  about: {
    title: "About",
    body: "Aspiring Network Engineer with hands-on experience designing, segmenting, and monitoring enterprise-style networks, including routing/switching, Active Directory, firewalls, VPNs, and cloud networking on AWS. Comfortable troubleshooting network issues and working across Linux and Windows Server environments. Currently pursuing an MSc in Computer Science at EPITA in Paris.",
  },
  skills: {
    title: "Technical skills",
    groups: [
      {
        name: "Networking",
        items: [
          "TCP/IP",
          "OSI Model",
          "Routing & Switching (OSPF, BGP)",
          "VLANs",
          "DNS / DHCP",
        ],
      },
      {
        name: "Network Security",
        items: ["Firewalls", "VPN", "IDS/IPS (Suricata, Zeek)", "Wazuh"],
      },
      {
        name: "Monitoring & Troubleshooting",
        items: ["Wireshark", "SNMP", "Splunk"],
      },
      {
        name: "Cloud Networking",
        items: ["AWS VPC", "CloudTrail", "GuardDuty"],
      },
      {
        name: "Operating Systems",
        items: ["Linux", "Windows Server", "Active Directory"],
      },
      {
        name: "Scripting",
        items: ["Python", "Bash"],
      },
    ],
  },
  projects: {
    title: "Projects & labs",
    subtitle:
      "Hands-on labs I built from scratch to practice real enterprise networking and security scenarios.",
    selfInitiated: "Self-initiated",
    items: [
      {
        title: "Enterprise SOC Homelab",
        description:
          "Built a virtualized enterprise network on Proxmox with an Active Directory domain and a full monitoring stack, gaining hands-on experience with network segmentation, traffic analysis, and end-to-end log visibility.",
        stack: ["Proxmox", "Active Directory", "Wazuh", "Suricata", "Zeek"],
      },
      {
        title: "Active Directory Attack & Defense Lab",
        description:
          "Simulated common network and domain attack techniques (lateral movement, Kerberoasting) in a lab environment and wrote detection rules mapped to MITRE ATT&CK to harden the network's security posture.",
        stack: ["Active Directory", "MITRE ATT&CK", "Detection Engineering"],
      },
      {
        title: "AWS Security Monitoring Lab",
        description:
          "Configured a cloud network monitoring pipeline using CloudTrail and GuardDuty, with automated alerting for suspicious activity across cloud infrastructure.",
        stack: ["AWS", "CloudTrail", "GuardDuty"],
      },
      {
        title: "Automated Incident Response Platform",
        description:
          "Built an automation layer that ingests network/security alerts, enriches them, and triggers notifications and remediation actions, reducing response time to network incidents.",
        stack: ["Python", "Automation", "Alerting"],
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "MSc Computer Science",
        school: "EPITA, Paris, France",
        period: "Since 2026",
        details:
          "Relevant coursework: Cybersecurity, Databases, Privacy Engineering, Digital Business Transformation.",
        abbr: "EPITA",
        logo: "/logos/epita.png",
      },
      {
        degree: "B.E. Computer Science",
        school: "Hindusthan Institute of Technology, Coimbatore, India",
        period: "2021 to 2025",
        details: "CGPA: 7.76.",
        abbr: "HIT",
        logo: "/logos/hitech.png",
      },
    ],
  },
  participation: {
    title: "Participation",
    items: [
      {
        role: "Speaker, research paper presentation",
        event:
          "International Conference on Emerging Trends in Artificial Intelligence 2025 (ICETAI'25)",
        date: "29 March 2025",
        place:
          "Dhanalakshmi Srinivasan College of Engineering, Coimbatore, India",
      },
    ],
  },
  contact: {
    title: "Let's connect",
    body: "I'm actively looking for network engineering opportunities in France. If you think I could be a good fit for your team, I'd love to hear from you.",
    emailCta: "Send me an email",
    phoneLabel: "Phone",
  },
  footer: {
    elsewhere: "Elsewhere",
    builtWith: "Built with Next.js",
  },
};

const fr: Dictionary = {
  nav: {
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    education: "Formation",
    participation: "Participation",
    contact: "Contact",
    theme: "Changer de thème",
  },
  hero: {
    name: "Harisaran Vasu",
    role: "Ingénieur Réseaux",
    location: "Paris, France",
    intro:
      "Je suis ingénieur réseaux en devenir. Je conçois, segmente et supervise des réseaux d'entreprise : routage et commutation, Active Directory, pare-feu, VPN et réseaux cloud sur AWS. Je passe l'essentiel de mon temps libre à monter des labs pour casser des choses, puis les défendre. Je suis actuellement en MSc Computer Science à l'EPITA, à Paris.",
    available: "Ouvert aux opportunités en ingénierie réseaux partout en France.",
  },
  about: {
    title: "À propos",
    body: "Futur ingénieur réseaux avec une expérience pratique dans la conception, la segmentation et la supervision de réseaux de type entreprise : routage/commutation, Active Directory, pare-feu, VPN et réseaux cloud sur AWS. À l'aise dans le dépannage réseau et le travail sous Linux comme sous Windows Server. Actuellement en MSc Computer Science à l'EPITA, à Paris.",
  },
  skills: {
    title: "Compétences techniques",
    groups: [
      {
        name: "Réseaux",
        items: [
          "TCP/IP",
          "Modèle OSI",
          "Routage & commutation (OSPF, BGP)",
          "VLAN",
          "DNS / DHCP",
        ],
      },
      {
        name: "Sécurité réseau",
        items: ["Pare-feu", "VPN", "IDS/IPS (Suricata, Zeek)", "Wazuh"],
      },
      {
        name: "Supervision & dépannage",
        items: ["Wireshark", "SNMP", "Splunk"],
      },
      {
        name: "Réseaux cloud",
        items: ["AWS VPC", "CloudTrail", "GuardDuty"],
      },
      {
        name: "Systèmes d'exploitation",
        items: ["Linux", "Windows Server", "Active Directory"],
      },
      {
        name: "Scripting",
        items: ["Python", "Bash"],
      },
    ],
  },
  projects: {
    title: "Projets & labs",
    subtitle:
      "Des labs construits de A à Z pour m'exercer sur des scénarios réels de réseau et de sécurité en entreprise.",
    selfInitiated: "Projet personnel",
    items: [
      {
        title: "Homelab SOC d'entreprise",
        description:
          "Construction d'un réseau d'entreprise virtualisé sur Proxmox avec un domaine Active Directory et une stack de supervision complète : segmentation réseau, analyse de trafic et visibilité de bout en bout sur les logs.",
        stack: ["Proxmox", "Active Directory", "Wazuh", "Suricata", "Zeek"],
      },
      {
        title: "Lab attaque & défense Active Directory",
        description:
          "Simulation de techniques d'attaque réseau et de domaine courantes (mouvement latéral, Kerberoasting) en environnement de lab, avec écriture de règles de détection alignées sur MITRE ATT&CK pour renforcer la posture de sécurité du réseau.",
        stack: ["Active Directory", "MITRE ATT&CK", "Détection"],
      },
      {
        title: "Lab de supervision sécurité AWS",
        description:
          "Mise en place d'un pipeline de supervision réseau cloud avec CloudTrail et GuardDuty, incluant des alertes automatisées en cas d'activité suspecte sur l'infrastructure cloud.",
        stack: ["AWS", "CloudTrail", "GuardDuty"],
      },
      {
        title: "Plateforme de réponse à incident automatisée",
        description:
          "Développement d'une couche d'automatisation qui ingère les alertes réseau/sécurité, les enrichit et déclenche notifications et actions de remédiation, réduisant le temps de réponse aux incidents réseau.",
        stack: ["Python", "Automatisation", "Alerting"],
      },
    ],
  },
  education: {
    title: "Formation",
    items: [
      {
        degree: "MSc Computer Science",
        school: "EPITA, Paris, France",
        period: "Depuis 2026",
        details:
          "Cours pertinents : cybersécurité, bases de données, privacy engineering, transformation digitale.",
        abbr: "EPITA",
        logo: "/logos/epita.png",
      },
      {
        degree: "B.E. Computer Science",
        school: "Hindusthan Institute of Technology, Coimbatore, Inde",
        period: "2021 to 2025",
        details: "CGPA : 7,76.",
        abbr: "HIT",
        logo: "/logos/hitech.png",
      },
    ],
  },
  participation: {
    title: "Participation",
    items: [
      {
        role: "Intervenant, présentation d'un article de recherche",
        event:
          "International Conference on Emerging Trends in Artificial Intelligence 2025 (ICETAI'25)",
        date: "29 mars 2025",
        place:
          "Dhanalakshmi Srinivasan College of Engineering, Coimbatore, Inde",
      },
    ],
  },
  contact: {
    title: "Restons en contact",
    body: "Je recherche activement des opportunités en ingénierie réseaux en France. Si mon profil correspond à votre équipe, je serais ravi d'échanger avec vous.",
    emailCta: "M'envoyer un e-mail",
    phoneLabel: "Téléphone",
  },
  footer: {
    elsewhere: "Ailleurs",
    builtWith: "Réalisé avec Next.js",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const profile = {
  email: "harisaran.official@gmail.com",
  phone: "+33 6 89 24 72 20",
  linkedin: "https://linkedin.com/in/realharisaran",
  github: "https://github.com/HARISARAN404",
  leetcode: "https://leetcode.com/u/harisaran404/",
};
