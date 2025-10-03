import { Link, Button } from "@heroui/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Finansal Geleceğinizi <span className="text-primary">Güvenle</span> Şekillendirin
        </h1>
        <p className="mt-6 text-xl text-default-500">
          Kredi ve birikim hedeflerinizi planlamak için ihtiyacınız olan modern araçlar burada. Finansta ile finansal kararlarınızı güvenle alın.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          href="/credit"
          as={Link}
          color="primary"
          variant="solid"
          size="lg"
          className="w-full md:w-auto"
        >
          Kredi Hesaplayıcıya Git
        </Button>
        <Button
          href="/savings"
          as={Link}
          color="primary"
          variant="ghost"
          size="lg"
          className="w-full md:w-auto"
        >
          Tasarruf Planlayıcı
        </Button>
      </div>
    </section>
  );
}