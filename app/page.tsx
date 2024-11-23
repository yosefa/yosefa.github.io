import React from 'react';
import { Github, Linkedin, Mail, Code2, Server, Database, Smartphone, Cloud, Shield, Terminal, Briefcase, MessageSquareMore, Layout } from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Yosefa Ferdianto
          </h1>
          <p className="text-xl text-gray-700 font-light">Full Stack Developer | Software Engineer</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/yosefa" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/yosefaferdianto" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:yosefa@ganteng.my.id" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </header>

        {/* Introduction Section */}
        <section className="bg-white shadow-xl rounded-2xl md:p-8 p-6 mb-12 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-start space-x-4">
            <MessageSquareMore className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Hello 👋</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                I&apos;m Yosefa, a passionate full-stack developer with a love for learning and continuous growth. Over the years, I&apos;ve tackled a variety of challenging projects that have shaped me into the professional I am today. My philosophy is simple: technology should solve problems, not create them. That&apos;s why I focus on crafting solutions that make life and work easier.
              </p>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Let&apos;s collaborate!</h3>
              <p className="text-gray-700 leading-relaxed">
                I&apos;m always excited to explore new projects and collaborate on fresh ideas! Whether you need a hand with tech solutions or just want to bounce around some thoughts, don&apos;t hesitate to reach out.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white shadow-xl rounded-2xl md:p-8 p-6 mb-12">
          <div className="flex items-center mb-6">
            <Terminal className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-blue-600">Technical Skills</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <SkillCard 
              icon={<Code2 className="w-6 h-6" />}
              title="Frontend"
              skills={['HTML', 'CSS', 'Bootstrap', 'jQuery', 'React']}
            />
            <SkillCard 
              icon={<Server className="w-6 h-6" />}
              title="Backend"
              skills={['PHP', 'Node.js', 'Python', 'CodeIgniter', 'Express']}
            />
            <SkillCard 
              icon={<Database className="w-6 h-6" />}
              title="Database"
              skills={['MySQL', 'MariaDB', 'SQLite', 'SQL Server']}
            />
            <SkillCard 
              icon={<Smartphone className="w-6 h-6" />}
              title="Mobile"
              skills={['React Native', 'Java', 'Kotlin']}
            />
            <SkillCard 
              icon={<Cloud className="w-6 h-6" />}
              title="Cloud & Server"
              skills={['Hosting', 'VPS', 'Ubuntu', 'RedHat', 'Git', 'Docker']}
            />
            <SkillCard 
              icon={<Shield className="w-6 h-6" />}
              title="Other"
              skills={['CyberSecurity', 'SSL', 'Nginx', 'WordPress']}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white shadow-xl rounded-2xl md:p-8 p-6 mb-12">
          <div className="flex items-center mb-8">
            <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-blue-600">Projects</h2>
          </div>
          
          <div className="space-y-8">
            <ProjectCard
              title="ERP System"
              description="A comprehensive web-based ERP system designed to revolutionize how businesses operate. This all-in-one platform seamlessly integrates essential functions like accounting, inventory, sales, HR, and logistics."
              tags={['PHP', 'CodeIgniter', 'Node.js', 'Express', 'MySQL', 'SQLite', 'jQuery', 'Bootstrap', 'Microsoft Graph API', 'Mekari Talenta API']}
            />
            <ProjectCard
              title="AI Server Project"
              description="An AI Server Project designed to provide a powerful and scalable platform for running and managing AI models efficiently. This solution leverages advanced containerization technology."
              tags={['Claude', 'Llama AI', 'Open WebUI', 'Docker', 'Python']}
            />
            <ProjectCard
              title="Automation Estimation Tools"
              description="A powerful web-based application crafted to simplify the project estimation process. Tailored for estimators, it effortlessly gathers data and transforms it into professional proposals."
              tags={['PhpSpreadsheet', 'Cron', 'MySQL']}
            />
            <ProjectCard
              title="CCTV Monitoring System"
              description="A cutting-edge solution for real-time video surveillance and recording, designed to elevate security and operational oversight. Complete with live access and secure storage."
              tags={['Motion', 'Debian', 'Rclone', 'IP Camera', 'Hikvision']}
            />
            <ProjectCard
              title="Company Profile Management"
              description="Overseeing the hosting and domain management for the company website to ensure a seamless online presence. This involves maintaining uninterrupted website accessibility, keeping the domain registration up-to-date, and proactively managing any hosting requirements to guarantee optimal performance and reliability."
              tags={['WordPress', 'Hosting', 'Domain']}
            />
            <ProjectCard
              title="Application for Loan"
              description="A Loan Applications system designed to simplify the loan request process for employees. Built with Microsoft Forms and Microsoft Power Automate, this automated solution streamlines every step—from application and approval to tracking loan requests—making the process efficient, transparent, and hassle-free for both employees and administrators."
              tags={['Microsoft Power Apps', 'Microsoft Power Automate', 'Microsoft Forms']}
            />
          </div>
        </section>

        <footer className="text-center py-6 text-gray-600">
          <p>Made with <span className="text-red-500">♥</span> in Jakarta</p>
        </footer>
      </div>
    </div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills }) => (
  <div className="bg-blue-50 p-6 rounded-xl transform hover:scale-105 transition-transform">
    <div className="flex items-center mb-3">
      <div className="text-blue-600 mr-2">
        {icon}
      </div>
      <h3 className="font-bold text-blue-600">{title}</h3>
    </div>
    <p className="text-gray-700">{skills.join(', ')}</p>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags }) => (
  <div className="border-b border-gray-100 pb-6 transform hover:scale-[1.01] transition-transform">
    <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center">
      <Layout className="w-5 h-5 mr-2" />
      {title}
    </h3>
    <p className="text-gray-700 mb-3">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default Home;