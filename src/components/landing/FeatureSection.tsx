
import React from "react";
import { Check } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const FeatureSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "AI-Powered Creation",
      description:
        "Transform your ideas into visually stunning comics with simple text prompts.",
      icon: (
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B46C1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H2" />
            <path d="M22 12h-8" />
            <path d="M18 8l4 4-4 4" />
          </svg>
        </div>
      ),
      benefits: [
        "Natural language prompts",
        "Style customization",
        "Character consistency",
      ],
    },
    {
      title: "Intuitive Panel Management",
      description:
        "Easily organize, resize, and arrange comic panels with our drag-and-drop interface.",
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3182CE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
      ),
      benefits: [
        "Drag-and-drop interface",
        "Multiple layout templates",
        "Custom panel sizes",
      ],
    },
    {
      title: "Multiple Comic Styles",
      description:
        "Choose from various comic styles including Manga, Western, and Children's book aesthetics.",
      icon: (
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D53F8C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" y1="8" x2="12" y2="8" />
            <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
            <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
          </svg>
        </div>
      ),
      benefits: [
        "Manga aesthetics",
        "Western comic layouts",
        "Children's book simplicity",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-white" id="features">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Comic Creators
          </h2>
          <p className="text-comic-gray text-lg max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with intuitive design
            tools to help you create professional comics with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transition-transform hover:transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-comic-gray mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-comic-purple mr-2 flex-shrink-0" />
                    <span className="text-sm text-comic-gray">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
