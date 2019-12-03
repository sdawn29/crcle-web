<template>
  <div>
    <Navbar />
    <div class="text-xl font-semibold">Create a new Crcle</div>
    <form class="flex justify-between my-3">
      <div class="w-1/2">
        <label for="name" class="font-bold text-gray-700">
          Name
          <span class="text-red-500">•</span>
        </label>
        <div
          class="text-xs font-medium text-gray-600"
        >Name of the comunity using which different users will find the community.</div>
        <input
          type="text"
          placeholder="Enter name of the comunity"
          class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
          required
        />
        <label for="Description" class="font-bold text-gray-700">
          Description
          <span class="text-red-500">•</span>
        </label>
        <div
          class="text-xs font-medium text-gray-600"
        >This is how new members come to understand your community.</div>
        <textarea
          type="text"
          rows="5"
          placeholder="Enter what the comunity is meant for. Max 500 words"
          class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
          required
        />
        <label for="avatar" class="font-bold text-gray-700">Avatar Image link</label>
        <div
          class="text-xs font-medium text-gray-600"
        >Enter the link for the image that will be the avatar of the community.</div>
        <input
          type="text"
          placeholder="https://someimagelink.xyz"
          class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
          required
        />
        <label for="avatar" class="font-bold text-gray-700">
          Theme Color
          <span class="text-red-500">•</span>
        </label>

        <div
          class="text-xs font-medium text-gray-600"
        >Select the theme color of the community, you will be able to see this color at different parts of your crcle.</div>
        <div class="flex my-2">
          <div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-gray-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Gray</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-red-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Red</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-orange-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Orange</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-yellow-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Yellow</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-green-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Green</div>
              <br />
            </div>
          </div>
          <div class="mx-20">
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-teal-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Teal</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-blue-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Blue</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-indigo-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Indigo</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-purple-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Purple</div>
              <br />
            </div>
            <div class="my-2">
              <input type="radio" name="theme" value="male" />
              <div class="bg-pink-600 w-6 h-6 rounded inline-block mx-2"></div>
              <div class="text-sm font-semibold text-gray-800 inline-block">Pink</div>
              <br />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white my-2 px-4 py-2 font-bold rounded cursor-pointer shadow-md"
        >Create Crcle</button>
      </div>
      <div class="w-1/2 pl-6 mt-32">
        <img src="../assets/createcrcle.svg" alt />
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style>
</style>