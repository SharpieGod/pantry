import { redirect } from "next/navigation";
import React from "react";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const AboutPage = async () => {
  const session = await getServerAuthSession();

  //   if (!session) {
  //     return redirect("/");
  //   }

  //   const user = await api.user.getUser({ id: session.user.id });

  //   return <div>{JSON.stringify(user)}</div>;

  return (
    <div>
      <Navbar />
      <div className="mx-36 mt-24">
        <h2 className="text-2xl font-bold">Mission statement</h2>
        <p className="mt-2 text-lg">
          At Pantry, our mission is to create a community-driven platform where
          surplus food finds a new home. We aim to reduce food waste, foster
          generosity, and ensure that no good food goes unused by connecting
          those who have with those who need.
        </p>
      </div>
      <div className="mx-36 mt-4">
        <h2 className="text-2xl font-bold">Why?</h2>
        <p className="mt-2 text-lg">
          Every year, millions of pounds of perfectly good, non-perishable food
          items are discarded, contributing to the growing problem of food
          waste. Meanwhile, many individuals and families struggle to access
          nutritious food. Pantry was born out of the desire to bridge this gap.
          By creating a simple and accessible way for people to share their
          surplus food with others in their community, we believe we can make a
          tangible impact on reducing waste and promoting food security for all.
        </p>
      </div>
      <div className="mx-36 mt-4">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="mt-2 text-lg">
          Pantry is a unique platform where users can easily list non-perishable
          food items they no longer need. Whether it&apos;s extra cans of soup,
          unopened pasta, or other pantry staples, users can upload images and
          details of these items, set a pick-up location, and offer them for
          free to others in their community. With an emphasis on local exchanges
          and sustainability, Pantry empowers individuals to make a difference,
          one food item at a time.
        </p>
      </div>
      <div className="mx-36 mt-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p className="mt-2 text-center text-lg">
          We&apos;d love to hear from you! Whether you have questions, feedback,
          or just want to say hello, feel free to reach out to us:
        </p>
        <p className="text-center text-lg">Email: contact@pantry.com</p>
        <p className="text-center text-lg">Phone: (123) 456-7890</p>
        <p className="text-center text-lg">Facebook: facebook.com/pantry</p>
        <p className="text-center text-lg">Instagram: instagram.com/pantry</p>
        <p className="text-center text-lg">Twitter: twitter.com/pantry</p>
      </div>
    </div>
  );
};

export default AboutPage;
