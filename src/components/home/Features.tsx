export function Features() {
  const features = [
    {
      title: "Fast Performance",
      description: "Optimized for speed and minimal loading times.",
    },
    {
      title: "Beautiful UI",
      description: "Carefully crafted components that look great out of the box.",
    },
    {
      title: "Fully Responsive",
      description: "Looks amazing on any device, from mobile to desktop.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Why Choose PrimeVista?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to build your next project faster and better.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm transition-all hover:shadow-md">
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
