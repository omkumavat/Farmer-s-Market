// EditProfile.js
import React from 'react';

const EditProfile = () => {
  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <label>
          Email:
          <input type="email" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
