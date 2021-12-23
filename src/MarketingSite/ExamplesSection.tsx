import React from 'react';

const ExamplesSection: React.FC = () => {
  const imgClass = 'h-56 mb-6 mt-6';
  const titleClass = 'mb-4 text-md font-bold';
  const paragraphClass = 'mb-4 text-base text-gray-800';
  return (
    <div className="py-10 px-4 bg-white">
      <div className="flex-col min-h-full mx-auto pt-10" style={{ maxWidth: '1280px' }}>
        <h1 className="text-2xl mb-4 md:text-4xl font-bold text-justify">Example Projects</h1>
        <div className="md:grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex justify-center">
              <img src="assets/images/kingdom-1060.png" className={imgClass} />
            </div>
            <div className={titleClass}>A physicist has a new technology and needs help developing a product.</div>
            <div className={paragraphClass}>
              Mira developed a new way to analyze fluid dynamics and thinks there could be a ton of healthcare and
              pharmaceutical applications. She posts her project on Cooperativ. <div className={paragraphClass} />
              Stephan, an engineer and senior executive at a large medical device company has been looking for a side
              project that could become something big. He contacts Mira with some ideas.{' '}
              <div className={paragraphClass} />
              Mira sends Stephan an invite to her project with a built in NDA. She pays him first in C², but they work
              together well and she decides to make him a co-founder.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img src="assets/images/kingdom-website-is-online.png" className={imgClass} />
            </div>
            <div className={titleClass}>
              A musician has an idea for a music social network and needs help building an MVP.
            </div>
            <div className={paragraphClass}>
              Jonas has a great idea and a talent for product design, but he needs engineering help. He doesn't have a
              lot of money, but he wants to bring on engineers that could eventually join full-time and stay with the
              company. <div className={paragraphClass} />
              Katya has some free time, and she likes Jonas' project. She offers to help for $30 and C²270 per hour.
              They agree that Jonas will set the trigger for these C² at $2m in investment.{' '}
              <div className={paragraphClass} />
              After 10 hours of work, Jonas sends Katya $300 and C²2700. When Jonas raises $2m from a VC, Katya cashes
              all her C² in for $2700.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img src="assets/images/kingdom-777.png" className={imgClass} />
            </div>
            <div className={titleClass}>
              Two engineers have created new dev tools and need help forming a business model.
            </div>
            <div className={paragraphClass}>
              Gita and Darrell have built a set of tools that make deploying smart contracts much faster, and they know
              a lot of other developers would pay to use it, but they aren't sure how to turn it into a business.{' '}
              <div className={paragraphClass} />
              Sol finds their project on Cooperativ, sees its potential, and asks to join. He can only work on
              Saturdays, but thats enough time for him to help Gita and Darrell organize their project into a business.{' '}
              <div className={paragraphClass} />
              When they get off the ground, Sol quits his job and joins their company as CEO.
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img src="assets/images/kingdom-profit-growth.png" className={imgClass} />
            </div>
            <div className={titleClass}>
              A fair-trade coffee coop is looking for help creating a digital marketplace.
            </div>
            <div className={paragraphClass}>
              Tom's company is helping farmers in Colombia sell their coffee directly to market directly to American
              cafes. He wants to make it social so that buyers better understand their suppliers.{' '}
              <div className={paragraphClass} />
              Tom knows the market and how to set up the business, but he needs a team of developers and designers to
              help him build the platform. He finds a group of people, some of whom already work together on other
              projects, who want to help. He uses Cooperativ's governance tools to set up a co-op so that everyone gets
              paid based on the share of work they do.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
