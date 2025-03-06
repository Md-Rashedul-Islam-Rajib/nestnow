// import { GlareCard } from "@/components/ui/glare-card";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";


type SkillCardProps = {
  icon: string;
  title: string;
};

const SkillCard = ({ icon, title }: SkillCardProps) => {
  return (
    <Card className="flex flex-col items-center justify-center p-4 md:p-6 w-full sm:w-[180px] md:w-[200px]">
      <Icon icon={icon} width="48" height="48" className="text-blue-500" />
      <p className="mt-2 text-lg font-medium text-gray-700 dark:text-white">
        {title}
      </p>
    </Card>
  );
};

export default SkillCard
