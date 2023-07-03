import { Button } from '@/components/atomic-design/atoms/Button-SC';

export default function Page() {
  return (
    <>
      <p className="my-5 font-bold text-primary">
        This is a page using <span className="text-secondary">tailwind</span>
      </p>
      <p className="sm:text-[hotpink] md:text-[powderblue] lg:text-[red]">
        I change color based on screen size.
      </p>
      <Button label="Button with tailwind" size="small" />
    </>
  );
}
