
import SkillCard from "./SkillCard";


const Skills = () => {
  const skills = [
    { icon: "vscode-icons:file-type-reactjs", title: "React" },
    { icon: "vscode-icons:file-type-node", title: "Node.js" },
    { icon: "vscode-icons:file-type-typescript-official", title: "TypeScript" },
    { icon: "logos:nextjs-icon", title: "Next.js" },
    { icon: "logos:tailwindcss-icon", title: "Tailwind CSS" },
    { icon: "skill-icons:javascript", title: "JavaScript" },
    { icon: "skill-icons:mongodb", title: "MongoDB" },
    { icon: "skill-icons:expressjs-dark", title: "Express.Js" },
    { icon: "devicon:mongoose-wordmark", title: "Mongoose" },
    { icon: "logos:html-5", title: "HTML" },
    { icon: "logos:css-3", title: "CSS" },
    { icon: "simple-icons:shadcnui", title: "Shadcn UI" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Skills
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <SkillCard key={index} icon={skill.icon} title={skill.title} />
        ))}
      </div>
    </div>
  );
};

export default Skills
