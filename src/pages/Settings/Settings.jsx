import SettingsProfile from '../../components/Settings/SettingsProfile';

/**
 * `Settings` is a React component designed to encapsulate and display user-specific settings interfaces.
 * It primarily wraps the `SettingsProfile` component, which allows users to manage their profile settings such as avatar and personal details.
 *
 * @returns {JSX.Element} The settings interface section containing the `SettingsProfile` component.
 */

function Settings() {
  return (
    <>
      <SettingsProfile />
    </>
  );
}

export default Settings;
