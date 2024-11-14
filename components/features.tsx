export function FeatureGridItem(props: {
  icon: React.ReactNode;
  title1: string;
  title2: string
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="ico flex lg:h-[350px] flex-col rounded-md p-6 gap-4">
        {props.icon}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl lg:text-3xl ">{props.title1}</h3>
          <h3 className="font-medium text-lg pt-1 pb-1 lg:text-xl">{props.title2}</h3>
          <p className="text-sm text-muted-foreground break-words lg:text-base">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid(props: {
  title: string;
  subtitle: string;
  items: {
    icon: React.ReactNode;
    title1: string;
    title2: string
    description: string;
  }[];
}) {
  return (
    <section
      id="features"
      className="relative z-1 container flex flex-col items-center justify-center gap-5 min-h-screen py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-8 text-center">
        <h2 className="text-4xl md:text-4xl font-semibold">
          {props.title}
        </h2>
        <p className="max-w-[85%] text-muted-foreground sm:text-xl text-wrap">
          {props.subtitle}
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3 mt-4">
        {props.items.map((item, index) => (
          <FeatureGridItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
