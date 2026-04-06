import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('portfolios');
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { key: 'portfolios', label: 'Portfolios', endpoint: '/api/portfolios/' },
    { key: 'films', label: 'Films', endpoint: '/api/films/' },
    { key: 'testimonials', label: 'Testimonials', endpoint: '/api/testimonials/' },
    { key: 'blog', label: 'Blog Posts', endpoint: '/api/blog/' },
    { key: 'enquiries', label: 'Enquiries', endpoint: '/api/enquiries/' },
  ];

  const fetchData = async () => {
    setLoading(true);
    const tab = tabs.find(t => t.key === activeTab);
    try {
      const res = await fetch(`http://localhost:8000${tab.endpoint}`);
      const json = await res.json();
      setData(json);
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    const tab = tabs.find(t => t.key === activeTab);
    try {
      await fetch(`http://localhost:8000${tab.endpoint}${id}`, { method: 'DELETE' });
      fetchData();
    } catch { alert('Error deleting'); }
  };

  const handleSave = async (formData) => {
    const tab = tabs.find(t => t.key === activeTab);
    try {
      if (editItem?._id) {
        await fetch(`http://localhost:8000${tab.endpoint}${editItem._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      } else {
        await fetch(`http://localhost:8000${tab.endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      }
      setShowModal(false); setEditItem(null); fetchData();
    } catch { alert('Error saving.'); }
  };

  const getDisplayColumns = () => {
    switch (activeTab) {
      case 'portfolios': return ['cover_image', 'couple_names', 'location', 'category', 'featured'];
      case 'films': return ['cover_image', 'title', 'couple_names', 'category', 'featured'];
      case 'testimonials': return ['image', 'couple_names', 'location', 'featured'];
      case 'blog': return ['cover_image', 'title', 'published'];
      case 'enquiries': return ['name', 'email', 'event_type', 'event_date', 'status'];
      default: return [];
    }
  };

  const renderCellValue = (item, col) => {
    const val = item[col];
    if (col === 'cover_image' || col === 'image') return <img src={val} alt="" className="admin-table-image" />;
    if (col === 'featured') return <span className={`admin-badge ${val ? 'featured' : ''}`}>{val ? 'Featured' : 'No'}</span>;
    if (col === 'published') return <span className={`admin-badge ${val ? 'featured' : ''}`}>{val ? 'Published' : 'Draft'}</span>;
    if (col === 'status') return <span className="admin-badge">{val}</span>;
    return val || '—';
  };

  return (
    <div className="page-enter">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h3 className="admin-sidebar-title">Admin Panel</h3>
          {tabs.map(tab => (
            <button key={tab.key} className={`admin-nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)} style={{ width: '100%', textAlign: 'left' }}>{tab.label}</button>
          ))}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <a href="/" className="admin-nav-link">← View Site</a>
          </div>
        </aside>
        <div className="admin-main">
          <div className="admin-header">
            <h1 className="admin-title">{tabs.find(t => t.key === activeTab)?.label}</h1>
            {activeTab !== 'enquiries' && <button className="admin-add-btn" onClick={() => { setEditItem(null); setShowModal(true); }}>+ Add New</button>}
          </div>
          {loading ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px' }}>Loading...</p>
          ) : data.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px' }}>No items found.</p>
          ) : (
            <table className="admin-table">
              <thead><tr>{getDisplayColumns().map(col => <th key={col}>{col.replace(/_/g, ' ')}</th>)}<th>Actions</th></tr></thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    {getDisplayColumns().map(col => <td key={col}>{renderCellValue(item, col)}</td>)}
                    <td>
                      <div className="admin-actions">
                        {activeTab !== 'enquiries' && <button className="admin-action-btn" onClick={() => { setEditItem(item); setShowModal(true); }}>Edit</button>}
                        <button className="admin-action-btn delete" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && <AdminModal type={activeTab} item={editItem} onSave={handleSave} onClose={() => { setShowModal(false); setEditItem(null); }} />}
    </div>
  );
}

function AdminModal({ type, item, onSave, onClose }) {
  const getFields = () => {
    switch (type) {
      case 'portfolios': return [{ name: 'title', label: 'Title', required: true }, { name: 'slug', label: 'Slug', required: true }, { name: 'couple_names', label: 'Couple Names', required: true }, { name: 'location', label: 'Location', required: true }, { name: 'date', label: 'Date', required: true }, { name: 'category', label: 'Category', type: 'select', options: ['destination', 'indian', 'intimate'] }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'story', label: 'Story', type: 'textarea', fullWidth: true }, { name: 'cover_image', label: 'Cover Image URL', required: true }, { name: 'featured', label: 'Featured', type: 'checkbox' }, { name: 'order', label: 'Order', type: 'number' }];
      case 'films': return [{ name: 'title', label: 'Title', required: true }, { name: 'slug', label: 'Slug', required: true }, { name: 'couple_names', label: 'Couple Names', required: true }, { name: 'location', label: 'Location', required: true }, { name: 'category', label: 'Category', type: 'select', options: ['classic', 'modern', 'cinematic'] }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'cover_image', label: 'Cover Image URL', required: true }, { name: 'video_url', label: 'Video URL', required: true }, { name: 'featured', label: 'Featured', type: 'checkbox' }];
      case 'testimonials': return [{ name: 'couple_names', label: 'Couple Names', required: true }, { name: 'location', label: 'Location', required: true }, { name: 'review', label: 'Review', type: 'textarea', fullWidth: true }, { name: 'image', label: 'Image URL', required: true }, { name: 'featured', label: 'Featured', type: 'checkbox' }];
      case 'blog': return [{ name: 'title', label: 'Title', required: true }, { name: 'slug', label: 'Slug', required: true }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' }, { name: 'content', label: 'Content', type: 'textarea', fullWidth: true }, { name: 'cover_image', label: 'Cover Image URL', required: true }, { name: 'published', label: 'Published', type: 'checkbox' }];
      default: return [];
    }
  };
  const fields = getFields();
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach(f => { initial[f.name] = f.type === 'checkbox' ? (item?.[f.name] ?? false) : f.type === 'number' ? (item?.[f.name] ?? 0) : (item?.[f.name] ?? ''); });
    return initial;
  });
  const handleChange = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
        <h3 className="admin-modal-title">{item ? 'Edit' : 'Add New'}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          {fields.map(field => (
            <div className={`form-group ${field.fullWidth ? 'full-width' : ''}`} key={field.name}>
              <label htmlFor={`modal-${field.name}`}>{field.label}</label>
              {field.type === 'textarea' ? <textarea id={`modal-${field.name}`} value={formData[field.name]} onChange={e => handleChange(field.name, e.target.value)} required={field.required} />
              : field.type === 'select' ? <select id={`modal-${field.name}`} value={formData[field.name]} onChange={e => handleChange(field.name, e.target.value)}>{field.options.map(o => <option key={o} value={o}>{o}</option>)}</select>
              : field.type === 'checkbox' ? <div style={{ paddingTop: '10px' }}><input type="checkbox" id={`modal-${field.name}`} checked={formData[field.name]} onChange={e => handleChange(field.name, e.target.checked)} style={{ width: 'auto' }} /> Yes</div>
              : <input type={field.type || 'text'} id={`modal-${field.name}`} value={formData[field.name]} onChange={e => handleChange(field.name, field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)} required={field.required} />}
            </div>
          ))}
          <div className="full-width" style={{ display: 'flex', gap: '16px', gridColumn: '1 / -1' }}>
            <button type="submit" className="submit-btn" style={{ flex: 1 }}>{item ? 'Update' : 'Create'} →</button>
            <button type="button" className="submit-btn" style={{ flex: 0, background: 'var(--text-muted)' }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
